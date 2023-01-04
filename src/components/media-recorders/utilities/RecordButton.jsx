import { styled } from '@material-ui/core/styles';
import { memo } from 'react';

const RecWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  bottom: '10px'
}));

const ButtonBorder = styled('div')(() => ({
  border: '4px solid #E1E4E7',
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  position: 'relative',
  marginRight: '10px'
}));

const Instructions = styled('p')(() => ({
  fontFamily: 'Public Sans,sans-serif',
  fontSize: '15px',
  color: '#071A33',
  display: 'flex',
  marginRight: '5px',
  fontWeight: 500
}));

const InstuctionsHighlight = styled('p')(() => ({
  fontWeight: 500,
  color: '#dc6547',
  padding: '0 5px'
}));

const Button = styled('button')(() => ({
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '50%',
  width: '17px',
  height: '17px',
  background: 'rgba(227, 73, 28, 0.8)',
  outline: 'none',
  border: 'none',
  margin: '2px',
  cursor: 'pointer',
  position: 'absolute',
  left: '5.40px',
  top: '5.1px',
  zIndex: 5,
  '&:hover': {
    background: '#fb6d42'
  }
}));

const RecordButton = memo(({ t, ...props }) => (
  <RecWrapper>
    <ButtonBorder>
      <Button {...props} />
    </ButtonBorder>
    <Instructions>
      <p>{t('PRESS')} </p>
      <InstuctionsHighlight> {t('REC')} </InstuctionsHighlight>
      {t('WHEN READY')}
    </Instructions>
  </RecWrapper>
));

export default RecordButton;
