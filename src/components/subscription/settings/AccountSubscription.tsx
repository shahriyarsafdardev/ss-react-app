import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import axios from 'utils/axios';

import AddCreditsForm from './AddCreditsForm';
import CancelSubscriptionForm from './CancelSubscriptionForm';
import { useStyles } from './Common';
import PaymentDetails from './PaymentDetails';
import PaymentDetailsForm from './PaymentDetailsForm';
import PaymentHistory from './PaymentHistory';
import SubscriptionDetails from './SubscriptionDetails';
import { SubscriptionDetail } from '../../../@types/cohorts';

export default function AccountSubscription() {
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState<SubscriptionDetail>();

  const classes = useStyles();

  const getSubscriptionDetails = async () => {
    const response = await axios.get('/account_subscriptions.json');
    setAccountDetails(response.data);
  };

  useEffect(() => {
    getSubscriptionDetails();
  }, []);

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
        accountID={accountDetails?.account.id}
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
      <AddCreditsForm
        modalType={modalType}
        setModal={setAddCreditModal}
        accountID={accountDetails?.account.id}
        accountDetails={accountDetails}
      />
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
      <PaymentDetailsForm setModal={setPaymentMethodModal} accountID={accountDetails?.account.id} />
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
        accountDetails={accountDetails}
      />
      <PaymentDetails setPaymentMethodModal={setPaymentMethodModal} />
      <PaymentHistory transactions={accountDetails?.history || []} />
    </>
  );
}
