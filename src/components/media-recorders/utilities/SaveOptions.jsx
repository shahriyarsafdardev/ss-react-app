import React, { useState } from 'react';
import './SaveOptions.css';
import { Button } from '@material-ui/core';

const SaveOptions = ({ onSaveClick, onRedoClick, onExitClick }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="questions-answers-save-options">
      {loading ? (
        <div />
      ) : (
        <Button
          variant="outlined"
          style={{ width: 296, height: 31, marginTop: 3, borderRadius: 4 }}
          onClick={onRedoClick}
        >
          {' '}
          Start new Recording{' '}
        </Button>
      )}
    </div>
  );
};

export default SaveOptions;
