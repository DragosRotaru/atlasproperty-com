import React from 'react';
import LinearProgress from 'rmwc/LinearProgress';
import Style from './Loading.css';

function Loading() {
  return (
    <div className={ Style.container }>
      <LinearProgress className={ Style.loading } determinate={ false } />
    </div>
  );
}

export default Loading;
