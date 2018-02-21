import React, { Component } from 'react';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import { analytics } from '../../analytics';
import Style from './Home.css';
import Stages from './Stages';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      link: '/',
      stages: Stages,
    };
    this.updateStage = (index, output) => {
      this.setState((prevState) => {
        const updatedStage = prevState.stages[index];
        updatedStage.output = output;
        const newStages = prevState.stages.slice();
        newStages.splice(index, 1, updatedStage);
        if (typeof output.destination !== 'undefined') {
          return {
            ...prevState,
            link: output.destination,
            counter: index + 1,
            stages: newStages,
          };
        }
        return {
          ...prevState,
          link: '/',
          counter: index + 1,
          stages: newStages,
        };
      });
    };
  }
  componentDidMount() {
    analytics.page('Home');
  }
  render() {
    const naturalLanguageForm = this.state.stages.map((stage, index) => {
      // If it is ahead of the current stage
      if (index > this.state.counter) {
        return '';
      }
      // If it is the first and current stage (Text only)
      if (index === this.state.counter && index === 0) {
        return (
          <Typist
            key={ ['NLform', index].join('') }
            className={ Style.text }
            cursor={ { show: false } }
            onTypingDone={ () => this.updateStage(index, stage.output) }
          >
            { stage.output.text }
          </Typist>
        );
      }
      // If it is the first stage (Text only)
      if (index === 0) {
        return (
          <span key={ ['NLform', index].join('') } className={ Style.text } >
            { stage.output.text }
          </span>
        );
      }
      // If it is the second stage (Select only)
      if (index === 1 && stage.type === 'select') {
        return (
          <Select
            key={ ['NLform', index].join('') }
            className={ Style.select }
            value={ stage.output.text }
            onChange={ evt => this.updateStage(index, evt.target.value) }
            label=" "
            options={ stage.options }
          />
        );
      }
      const options = stage.options[this.state.stages[index - 1].output.text];

      // If there is nothing to show
      if (!options) {
        return '';
      }

      // If it is a past stage
      if (index <= this.state.counter) {
        if (stage.type === 'text') {
          return (
            <span key={ ['NLform', index].join('') } className={ Style.text } >
              { stage.output.text }
            </span>
          );
        }
        if (stage.type === 'select') {
          return (
            <Select
              key={ ['NLform', index].join('') }
              className={ Style.select }
              value={ stage.output.text }
              onChange={ evt => this.updateStage(index, evt.target.value) }
              label=" "
              options={ options }
            />
          );
        }
      }
      // If it is the current stage
      if (index === this.state.counter) {
        if (stage.type === 'text') {
          return (
            <Typist
              key={ ['NLform', index].join('') }
              className={ Style.text }
              cursor={ { show: false } }
              onTypingDone={ () =>
                this.updateStage(index, options) }
            >
              { options }
            </Typist>
          );
        }
        if (stage.type === 'select') {
          return (
            <Select
              key={ ['NLform', index].join('') }
              className={ Style.select }
              value={ stage.output.text }
              onChange={ evt => this.updateStage(index, evt.target.value) }
              label=""
              options={ options }
            />
          );
        }
      }
      return '';
    });
    const link = (
      <Link
        to={ this.state.link }
        href={ this.state.link }
        onClick={ false /* () => {
          analytics.identify(analytics.user().anonymousId(), {
              name: console.log(analytics.user().id()),
              type: this.state.stages[1].output.text,
              interest: [this.state.stages[2].output.text,
              this.state.stages[3].output.text].join(' '),
              detail: [this.state.stages[4].output.text,
              this.state.stages[5].output.text].join(' '),
            });
         } */ }
      ><Button raised className={ Style.submit }>Continue</Button>
      </Link>
    );
    return (
      <div className={ Style.container }>
        <div className={ Style.content }>
          { naturalLanguageForm }
          { this.state.link !== '/' ? link : <span className={ Style.cursor }>|</span> }
        </div>
      </div>
    );
  }
}

export default Home;
