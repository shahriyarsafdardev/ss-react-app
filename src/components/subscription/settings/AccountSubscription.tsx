import { Modal } from 'components/animate';
import { useState } from 'react';
import AddCreditsForm from './AddCreditsForm';
import CancelSubscriptionForm from './CancelSubscriptionForm';
import { useStyles } from './Common';
import PaymentDetails from './PaymentDetails';
import PaymentDetailsForm from './PaymentDetailsForm';
import PaymentHistory from './PaymentHistory';
import SubscriptionDetails from './SubscriptionDetails';

export default function AccountSubscription() {
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);

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
      <CancelSubscriptionForm
        setModal={setCancelSubscriptionModal}
        setAddCreditModal={setAddCreditModal}
        setModalType={setModalType}
      />
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

  const UpdatePaymentMethodModal = () => (
    <Modal
      open={paymentMethodModal}
      onClose={() => {
        setPaymentMethodModal(false);
      }}
      zIndex={1400}
      className={classes.subscriptionModal}
    >
      <PaymentDetailsForm setModal={setPaymentMethodModal} />
    </Modal>
  );

  return (
    <>
      <AddCreditsModal />
      <CancelSubscriptionModal />
      <UpdatePaymentMethodModal />
      <SubscriptionDetails
        setModalType={setModalType}
        setAddCreditModal={setAddCreditModal}
        setCancelSubscriptionModal={setCancelSubscriptionModal}
      />
      <PaymentDetails setPaymentMethodModal={setPaymentMethodModal} />
      <PaymentHistory />
    </>
  );
}
