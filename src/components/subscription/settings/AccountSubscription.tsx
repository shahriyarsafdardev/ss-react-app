import { Modal } from 'components/animate';
import { useState } from 'react';
import AddCreditsForm from './AddCreditsForm';
import CancelSubscriptionForm from './CancelSubscriptionForm';
import { useStyles } from './Common';
import PaymentDetails from './PaymentDetails';
import PaymentHistory from './PaymentHistory';
import SubscriptionDetails from './SubscriptionDetails';

export default function AccountSubscription() {
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const classes = useStyles();

  const CancelSubscriptionModal = () => (
    <Modal
      open={cancelSubscriptionModal}
      onClose={() => {
        setCancelSubscriptionModal(false);
      }}
      zIndex={1400}
      className={classes.subscriptionModal}
    >
      <CancelSubscriptionForm setModal={setCancelSubscriptionModal} />
    </Modal>
  );

  const AddCreditsModal = () => (
    <Modal
      open={addCreditModal}
      onClose={() => {
        setAddCreditModal(false);
      }}
      zIndex={1400}
      className={classes.subscriptionModal}
    >
      <AddCreditsForm modalType={modalType} setModal={setAddCreditModal} />
    </Modal>
  );

  return (
    <>
      <AddCreditsModal />
      <CancelSubscriptionModal />
      <SubscriptionDetails
        setModalType={setModalType}
        setAddCreditModal={setAddCreditModal}
        setCancelSubscriptionModal={setCancelSubscriptionModal}
      />
      <PaymentDetails setModalType={setModalType} setAddCreditModal={setAddCreditModal} />
      <PaymentHistory />
    </>
  );
}
