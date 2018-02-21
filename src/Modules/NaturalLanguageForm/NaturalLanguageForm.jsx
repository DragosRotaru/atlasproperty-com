import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import Style from './NaturalLanguageForm.css';

class NaturalLanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.tree;

    this.displayNode = (node, key) => {
      const nodeView = [];
      if (typeof node.type === 'string' && node.typed === true) {
        const typed = (
          <span
            key={ [key, '-Typed'].join('') }
            className={ Style.text }
          >{ node.type }
          </span>
        );
        nodeView.push(typed);
      }
      if (typeof node.type === 'string' && node.typed !== true) {
        const typist = (
          <Typist
            key={ [key, '-Typist'].join('') }
            className={ Style.text }
            cursor={ { show: false } }
            onTypingDone={ () => this.typed(key) }
          >{ node.type }
          </Typist>
        );
        nodeView.push(typist);
      }
      if ((typeof node.type !== 'string' || node.typed === true) && typeof node.choices === 'object') {
        const select = (
          <Select
            key={ [key, '-Select'].join('') }
            className={ Style.select }
            value={ node.selected }
            onChange={ (evt) => { this.select(evt.target.value); } }
            label=""
            options={ Object.keys(node.choices) }
          />
        );
        nodeView.push(select);
      }
      if ((typeof node.type !== 'string' || node.typed === true) &&
        (typeof node.choices !== 'object' || typeof node.selected !== 'undefined') &&
        typeof node.link === 'string') {
        const link = (
          <Link
            key={ [key, '-Link'].join('') }
            to={ node.link }
          ><Button raised className={ Style.submit }>Continue</Button>
          </Link>
        );
        nodeView.push(link);
      }
      if ((typeof node.type !== 'string' || node.typed === true) &&
        (typeof node.choices !== 'object' || typeof node.selected !== 'undefined') &&
        typeof node.href === 'string') {
        const href = (
          <a
            key={ [key, '-Href'].join('') }
            href={ node.href }
          ><Button raised className={ Style.submit }>Continue</Button>
          </a>
        );
        nodeView.push(href);
      }
      return nodeView;
    };

    this.recursiveRender = (node, key) => {
      if (typeof node.selected !== 'undefined') {
        return this.displayNode(node, key).concat(this.recursiveRender(
          node.choices[node.selected],
          node.selected,
        ));
      }
      return this.displayNode(node, key);
    };

    this.select = (key) => {
      console.log(key);
      this.setState(prevState => this.recursiveSelect(prevState, key));
    };

    this.recursiveSelect = (node, key) => {
      const nextNode = node;
      if (Object.keys(node.choices).includes(key)) {
        if (typeof nextNode.selected !== 'undefined') {
          nextNode.choices[nextNode.selected] = this.clearSelected(node.choices[node.selected]);
        }
        nextNode.selected = key;
      } else {
        nextNode.choices[nextNode.selected] = this.recursiveSelect(
          node.choices[node.selected],
          key,
        );
      }
      return nextNode;
    };

    this.clearSelected = (node) => {
      const nextNode = node;
      if (typeof nextNode.selected !== 'undefined') {
        nextNode.choices[nextNode.selected] = this.clearSelected(node.choices[node.selected]);
        nextNode.selected = undefined;
      }
      return nextNode;
    };

    this.typed = (key) => {
      this.setState(prevState => this.recursiveTyped(prevState, 'root', key));
    };

    this.recursiveTyped = (node, nodeKey, key) => {
      const nextNode = node;
      if (nodeKey === key) {
        nextNode.typed = true;
        return nextNode;
      }
      if (typeof node.selected !== 'undefined') {
        nextNode.choices[nextNode.selected] = this.recursiveTyped(
          node.choices[node.selected],
          node.selected,
          key,
        );
      }
      return nextNode;
    };
  }
  render() {
    const form = this.recursiveRender(this.state, 'root');
    return form.concat(<span key="cursor" className={ Style.cursor }>|</span>);
  }
}
NaturalLanguageForm.propTypes = {
  tree: PropTypes.shape({
    choices: PropTypes.object,
    text: PropTypes.string,
  }).isRequired,
};

export default NaturalLanguageForm;
