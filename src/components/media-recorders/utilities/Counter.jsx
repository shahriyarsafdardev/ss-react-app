import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Menlo, monospace;
  font-size: 100px;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.5);
`;

const Countdown = ({ countdownTime }) => {
  const [time, setTime] = useState(countdownTime / 1000);

  const updateNumber = () => {
    const nextNumber = time - 1;
    setTime(nextNumber);
  };

  useEffect(() => {
    const timeout = setTimeout(updateNumber, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return <Root>{time !== 0 ? time : null}</Root>;
};

export default Countdown;
