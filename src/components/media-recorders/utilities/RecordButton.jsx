import { styled } from '@material-ui/core/styles';

const RecWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  bottom: '10px'
}));

const ButtonBorder = styled('div')(() => ({
  border: '8px solid rgba(255, 255, 255, 0.4)',
  height: '50px',
  width: '50px',
  borderRadius: '50%'
}));

const Instructions = styled('div')(() => ({
  fontFamily: 'Arial',
  fontSize: '14px',
  color: '#ffffff',
  letterSpacing: '1.75px',
  display: 'flex',
  marginRight: '5px'
}));

const InstuctionsHighlight = styled('div')(() => ({
  fontWeight: 700,
  color: '#dc6547',
  padding: '0 5px'
}));

const Button = styled('button')(() => ({
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '50%',
  width: '25px',
  height: '25px',
  background: 'rgba(227, 73, 28, 0.8)',
  outline: 'none',
  border: 'none',
  margin: '5px',
  cursor: 'pointer',
  zIndex: 5,
  '&:hover': {
    background: '#fb6d42'
  }
}));

const RecordButton = ({ t, ...props }) => (
  <RecWrapper>
    <Instructions>
      <div>{t('PRESS')} </div>
      <InstuctionsHighlight> {t('REC')} </InstuctionsHighlight>
      {t('WHEN READY')}
    </Instructions>

    <ButtonBorder>
      <Button {...props} />
    </ButtonBorder>
  </RecWrapper>
);

export default RecordButton;
