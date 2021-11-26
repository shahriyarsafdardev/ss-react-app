import React, { useState } from 'react';
import './SaveOptions.css';

const SaveOptions = ({ onSaveClick, onRedoClick, onExitClick }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="questions-answers-save-options">
      {loading ? (
        // <div className="flex flex-row">We're just uploading your footage, please hold tight! </div>
        // <DefaultLoader />
        <div />
      ) : (
        <div className="button-container">
          <button
            className="card button mr-5"
            onClick={() => {
              setLoading(true);
              onSaveClick();
            }}
          >
            Save Recording
          </button>
          <button className="card button" onClick={onRedoClick}>
            Redo Recording
          </button>
          <button className="card button ml-5" onClick={onExitClick}>
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default SaveOptions;
