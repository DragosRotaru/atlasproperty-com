import React from 'react';
import LinearProgress from 'rmwc/LinearProgress';
import Style from './style.css';

function Loading() {
  return (<LinearProgress className={ Style.loading } determinate={ false } />);
}

export default Loading;
