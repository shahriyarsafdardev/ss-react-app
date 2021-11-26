import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  font-family: Menlo, monospace;
  font-size: 28px;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.5);
`;

const RecIcon = styled.div`
  width: 16px;
  height: 16px;
  background: #e55226;
  border-radius: 50%;
  float: left;
  margin: 2px 8px;
  margin-left: 0;
`;

const pad = (unit) => {
  const str = `${unit}`;
  const pad = '00';
  return pad.substring(0, pad.length - str.length) + str;
};

const getState = (seconds) => {
  const minutes = Math.floor(seconds / 60);

  const humanTime =
    minutes !== 0 ? `${minutes}:${pad(seconds - minutes * 60)}` : `${seconds - minutes * 60}s`;

  return {
    seconds,
    human: humanTime
  };
};

const Timer = ({ timeLimit }) => {
  const [state, setState] = useState(getState(timeLimit ? timeLimit / 1000 : 0));

  useEffect(() => {
    const timer = setInterval(() => {
      const { seconds } = state;
      const nextSeconds = timeLimit ? seconds - 1 : seconds + 1;

      const nextState = getState(nextSeconds);
      setState(nextState);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Text>
      <RecIcon />
      {state.human || '0:00'}
    </Text>
  );
};

export default Timer;
