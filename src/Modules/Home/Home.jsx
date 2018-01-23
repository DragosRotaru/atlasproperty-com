import React from 'react';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import Living from '../../Images/Living.jpg';
import Style from './Home.css';

const cursorSettings = {
  show: true,
  blink: true,
  element: '|',
  hideWhenDone: false,
};


const Home = () => (
  <div className={ Style.container }>
    <img src={ Living } className={ Style.background } alt="Living" />
    <Typist className={ Style.heroText } cursor={ cursorSettings }>
      Find Your <Link to="/" href className={ Style.colorAccentUnderline }>Happy Place</Link>
    </Typist>
  </div>
);


export default Home;
