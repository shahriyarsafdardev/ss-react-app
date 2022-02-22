import { useState } from 'react';
import { Button, Stack } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { updateReferralCodes } from 'redux/slices/cohort';
import { Modal } from 'components/animate';
import { useSnackbar } from 'notistack5';
import { ReferralCode } from '../../../@types/cohorts';
import ReferralCodesForm from './ReferralCodesForm';
import { useDispatch } from '../../../redux/store';

const useStyles = makeStyles((theme) => ({
  codeModal: {
    width: '60% !important',
    margin: 'auto'
  }
}));

export default function ReferralCodesModal({
  codes,
  cohortID,
  cohortName
}: {
  codes: ReferralCode[];
  cohortID: string;
  cohortName: string;
}) {
  const [formModalState, setFormModalState] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSave = async (codes: ReferralCode[]) => {
    const updatedCodes = codes.filter((newCode) => newCode.code !== '');
    await dispatch(
      updateReferralCodes(cohortID, updatedCodes, (e: any) =>
        enqueueSnackbar(e, { variant: 'error' })
      )
    );
  };

  return (
    <>
      <Modal
        open={formModalState}
        onClose={() => {
          setFormModalState(false);
        }}
        zIndex={1400}
        className={classes.codeModal}
      >
        {codes && (
          <ReferralCodesForm
            key={String(codes?.length)}
            onSubmit={(codes: ReferralCode[]) => handleSave(codes)}
            codes={codes}
            cohortName={cohortName}
          />
        )}
      </Modal>
      <Button variant="outlined" color="primary" onClick={() => setFormModalState(true)}>
        Manage Referral Codes
      </Button>
    </>
  );
}
