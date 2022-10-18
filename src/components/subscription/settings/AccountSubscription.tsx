import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { initializeSubscription } from 'redux/slices/accountSubscription';
import AddCreditsForm from './AddCreditsForm';
import CancelSubscriptionForm from './CancelSubscriptionForm';
import { useStyles } from './Common';
import PaymentDetails from './PaymentDetails';
import PaymentDetailsForm from './PaymentDetailsForm';
import PaymentHistory from './PaymentHistory';
import SubscriptionDetails from './SubscriptionDetails';
import UpdateSubscriptionForm from './UpdateSubscriptionForm';

export default function AccountSubscription() {
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [updateSubscriptionModal, setUpdateSubscriptionModal] = useState(false);
  const accountDetails = useSelector((state: RootState) => state.subscription.subscription_detail);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeSubscription());
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
        setUpdateSubscriptionModal={setUpdateSubscriptionModal}
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
        setModal={setAddCreditModal}
        accountID={accountDetails?.account.id}
        accountDetails={accountDetails}
      />
    </Modal>
  );

  const UpdateSubscriptionModal = () => (
    <Modal
      open={updateSubscriptionModal}
      onClose={() => {
        setUpdateSubscriptionModal(false);
      }}
      zIndex={1400}
      className={classes.subscriptionModal}
    >
      <UpdateSubscriptionForm
        setModal={setUpdateSubscriptionModal}
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
      <UpdateSubscriptionModal />
      <CancelSubscriptionModal />
      <UpdatePaymentMethodModal />
      <SubscriptionDetails
        setAddCreditModal={setAddCreditModal}
        setCancelSubscriptionModal={setCancelSubscriptionModal}
        accountDetails={accountDetails}
      />
      <PaymentDetails setPaymentMethodModal={setPaymentMethodModal} />
      <PaymentHistory transactions={accountDetails?.history || []} />
    </>
  );
}
