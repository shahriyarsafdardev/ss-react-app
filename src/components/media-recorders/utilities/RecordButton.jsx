import { styled } from '@material-ui/core/styles';

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

const Instructions = styled('div')(() => ({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#071A33',
  letterSpacing: '1.75px',
  display: 'flex',
  marginRight: '5px',
  fontWeight: 400
}));

const InstuctionsHighlight = styled('div')(() => ({
  fontWeight: 400,
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

const RecordButton = ({ t, ...props }) => (
  <RecWrapper>
    <ButtonBorder>
      <Button {...props} />
    </ButtonBorder>
    <Instructions>
      <div>{t('PRESS')} </div>
      <InstuctionsHighlight> {t('REC')} </InstuctionsHighlight>
      {t('WHEN READY')}
    </Instructions>
  </RecWrapper>
);

export default RecordButton;
