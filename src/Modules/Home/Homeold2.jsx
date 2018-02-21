import React, { Component } from 'react';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import { analytics } from '../../analytics';
import Style from './Home.css';
import tree from './Tree';

class Home extends Component {
  constructor(props) {
    super(props);
    this.onTypingDone = () => {};
    this.onChange = () => {};
    this.processTree = (node) => {
      if (typeof node.text === 'string') {
        if (node.traversed !== true) {
          return (<Typist
            className={ Style.text }
            cursor={ { show: false } }
            onTypingDone={ () => {
              const nextNode = node;
              nextNode.traversed = true;
              this.processNode(nextNode);
              this.forceUpdate();
            } }
          >{ node.text }</Typist>);
        } else {
          return (<span className={ Style.text } >{ node.text }</span>);
        }
      } else if ((node.traversed === true || typeof node.text !== 'string') && typeof node.choices === 'object') {
        return (<Select
          className={ Style.select }
          value={ node.decision }
          onChange={ (evt) => { this.onChange(evt.target.value, node.key); } }
          label=""
          options={ Object.keys(node.choices) }
        />);
      } else if (typeof node.link === 'string') {
        return (<Link
          to={ node.link }
        ><Button raised className={ Style.submit }>Continue</Button>
        </Link>);
      } else if (typeof node.href === 'string') {
        return (<Link
          href={ node.href }
        ><Button raised className={ Style.submit }>Continue</Button>
        </Link>);
      }
    };
  }
  componentDidMount() {
    analytics.page('Home');
  }
  render() {
    return (
      <div className={ Style.container }>
        <div className={ Style.content }>
          { this.processTree(tree) }
          { <span className={ Style.cursor }>|</span> }
        </div>
      </div>);
  }
}

export default Home;
