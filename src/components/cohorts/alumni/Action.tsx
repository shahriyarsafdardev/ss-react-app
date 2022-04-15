import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Modal } from 'components/animate';
import { EditOutlined } from '@material-ui/icons';
import { updateAlumniByAdmin } from 'redux/slices/adminRegistrations';
import { Alumni } from '../../../@types/cohorts';
import AlumniForm from './AlumniForm';
import { useDispatch } from '../../../redux/store';

export const Action = ({ alumni }: { alumni: Alumni }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async (alumni: Alumni) => {
    await dispatch(updateAlumniByAdmin(alumni));
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        arrow
        placement="top"
        title={
          <span className="ui-copy text-white">View {'full name'.split(' ')[0]}’s Details</span>
        }
      >
        <IconButton
          aria-label="view-detail"
          onClick={() => {
            setOpen(true);
          }}
        >
          <EditOutlined />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        zIndex={1400}
      >
        <AlumniForm
          onClose={() => {
            setOpen(false);
          }}
          onSubmit={(alumni: Alumni) => handleUpdate(alumni)}
          alumni={alumni}
        />
      </Modal>
    </>
  );
};
