import React, { Component } from 'react';
import { analytics } from '../../analytics';
import NaturalLanguageForm from '../NaturalLanguageForm/NaturalLanguageForm';
import Style from './Home.css';
import formContent from './formContent';

class Home extends Component {
  componentDidMount() {
    analytics.page('Home');
  }
  render() {
    return (
      <div className={ Style.container }>
        <div className={ Style.content }>
          <NaturalLanguageForm tree={ formContent } />
        </div>
      </div>
    );
  }
}

export default Home;
