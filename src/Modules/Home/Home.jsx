import React, { Component } from 'react';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import Style from './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      to: '/',
      toOptions: {
        'buying property': { to: '/owners', href: true },
        'development projects': { to: '/owners', href: true },
        'the best management solution': { to: '/owners', href: true },
        'the owner portal': { to: '/owners', href: true },
        'emergency assistance': { to: '/login', href: true },
        'the tenant portal': { to: '/login', href: true },
        'help with an issue': { to: '/login', href: true },
        'all inclusive': { to: '/tenants', href: true },
        affordable: { to: '/tenants', href: true },
        'find my ideal space': { to: '/tenants', href: true },
        'being close to school': { to: '/tenants', href: true },
        'getting a good deal': { to: '/tenants', href: true },
        'premium quality': { to: '/tenants', href: true },
        'Office Admin': { to: '/company/#careers', href: true },
        Finance: { to: '/company/#careers', href: true },
        Accounting: { to: '/company/#careers', href: true },
        'IT, Software, Data Science': { to: '/company/#careers', href: true },
        Leasing: { to: '/company/#careers', href: true },
        Marketing: { to: '/company/#careers', href: true },
        'Maintenance, Operations': { to: '/company/#careers', href: true },
        'Management, Strategy': { to: '/company/#careers', href: true },
      },
      stages: [
        {
          type: 'text',
          result: 'I\'m ',
        },
        {
          type: 'select',
          result: false,
          options: [
            'a student',
            'a professional',
            'a parent',
            'a tenant',
            'a property owner',
            'an investor',
          ],
        },
        {
          type: 'text',
          result: false,
          options: {
            'a student': 'looking to rent a place',
            'a professional': 'looking to',
            'a parent': 'looking for an',
            'a tenant': 'and I need',
            'a property owner': 'looking for',
            'an investor': 'interested in',
          },
        },
        {
          type: 'select',
          result: false,
          options: {
            'looking to rent a place': [
              'with some friends',
              'with other students',
              'alone',
            ],
            'looking to': [
              'find my ideal space',
              'advance my career',
            ],
            'looking for an': [
              'all inclusive',
              'affordable',
            ],
            'and I need': [
              'emergency assistance',
              'the tenant portal',
              'help with an issue',
            ],
            'looking for': [
              'the best management solution',
              'the owner portal',
            ],
            'interested in': [
              'buying property',
              'development projects',
            ],
          },
        },
        {
          type: 'text',
          result: false,
          options: {
            'with some friends': 'The thing I value most is',
            'with other students': 'The thing I value most is',
            alone: 'The thing I value most is',
            'advance my career': 'My main interest is in ',
            'all inclusive': 'living for my child',
            affordable: 'living for my child',
            'the best management solution': 'on the market.',
            'buying property': 'with the help of an expert team.',
            'development projects': 'and I would like to start a conversation',
          },
        },
        {
          type: 'select',
          result: false,
          options: {
            'The thing I value most is': [
              'being close to school',
              'getting a good deal',
              'premium quality',
            ],
            'My main interest is in ': [
              'Office Admin',
              'Finance',
              'Accounting',
              'IT, Software, Data Science',
              'Leasing',
              'Marketing',
              'Maintenance, Operations',
              'Management, Strategy',
            ],
          },
        },
      ],
    };
    this.updateStage = (index, result) => {
      this.setState((prevState) => {
        let link = '/';
        if (result in prevState.toOptions) {
          link = prevState.toOptions[result];
        }
        const updatedStage = prevState.stages[index];
        updatedStage.result = result;
        const newStages = prevState.stages.slice();
        newStages.splice(index, 1, updatedStage);
        return { ...prevState, to: link, counter: index + 1, stages: newStages };
      });
    };
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
            onTypingDone={ () => this.updateStage(index, stage.result) }
          >
            { stage.result }
          </Typist>
        );
      }
      // If it is the first stage (Text only)
      if (index === 0) {
        return (
          <span key={ ['NLform', index].join('') } className={ Style.text } >
            { stage.result }
          </span>
        );
      }
      // If it is the second stage (Select only)
      if (index === 1 && stage.type === 'select') {
        return (
          <Select
            key={ ['NLform', index].join('') }
            className={ Style.select }
            value={ stage.result }
            onChange={ evt => this.updateStage(index, evt.target.value) }
            label=" "
            options={ stage.options }
          />
        );
      }
      const options = stage.options[this.state.stages[index - 1].result];

      // If it is a past stage
      if (index < this.state.counter) {
        if (stage.type === 'text') {
          return (
            <span key={ ['NLform', index].join('') } className={ Style.text } >
              { stage.result }
            </span>
          );
        }
        if (stage.type === 'select') {
          return (
            <Select
              key={ ['NLform', index].join('') }
              className={ Style.select }
              value={ stage.result }
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
              value={ stage.result }
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
        to={ '/tenants' }
        href
        className={ Style.submit }
      ><Button raised>Submit</Button>
      </Link>
    );
    return (
      <div className={ Style.container }>
        <div className={ Style.content }>
          { naturalLanguageForm }
          <span className={ Style.cursor }>|</span>
          { this.state.to !== '/' ? link : '' }
        </div>
      </div>
    );
  }
}

export default Home;
