import React from 'react';
import ReactStopwatch from 'react-stopwatch';

import './Timer.css';

const Timer = ({ large = false }) => {
  const prefixer = (value) => (value < 10 ? `0${value}` : value);

  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      render={({ formatted, hours, minutes, seconds }) => {
        const a = 0;
        return (
          <div className={`timer ${large ? 'large-timer' : 'small-timer'}`}>
            <div className="ellipse" />
            <p className="text">{`${prefixer(minutes)} : ${prefixer(seconds)}`}</p>
          </div>
        );
      }}
    />
  );
};

export default Timer;
