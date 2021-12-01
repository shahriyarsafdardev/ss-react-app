import { Button } from '@material-ui/core';
import './SaveOptions.css';

const SaveOptions = ({ onSaveClick, onRedoClick, onExitClick }) => (
  <div className="questions-answers-save-options">
    <Button
      variant="outlined"
      style={{
        width: 296,
        borderRadius: 4,
        position: 'absolute',
        bottom: 0,
        left: 0
      }}
      onClick={onRedoClick}
    >
      {' '}
      Start new Recording{' '}
    </Button>
  </div>
);

export default SaveOptions;
