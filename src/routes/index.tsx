import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// layouts
import AnalyticsTab from 'components/cohorts/analytics/AnalyticsTab';
import ResourcesPage from 'pages/dashboard/cohorts/resources/ResourcesPage';
import PublicDashboardLayout from '../layouts/public-dashboard';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import MainLayout from '../layouts/MainLayout';
import SphereNavbarLayout from '../layouts/SphereNavbarLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import RedirectToCohort from '../components/cohorts/RedirectToCohort';
// ----------------------------------------------------------------------

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Helmet>
        <link rel="canonical" href={`https://portal.getsphere.com${pathname}`} />
      </Helmet>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const companyRoles = ['company'];
  const adminRoles = ['admin'];
  const expertRoles = ['admin', 'expert'];
  const learnerRoles = ['learner', ...expertRoles];
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        // {
        //   path: 'register',
        //   element: (
        //     <GuestGuard>
        //       <Register />
        //     </GuestGuard>
        //   )
        // },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'first-login', element: <ResetUserPassword /> },
        { path: 'unlock-user', element: <UnlockUser /> },
        { path: 'unsubscribe-emails', element: <UnsubscribeEmails /> },
        { path: 'update-password', element: <UpdatePassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <RedirectToCohort /> },
        { path: '/contact-us', element: <ContactUs /> },
        { path: '/messaging', element: <PublicMessaging /> },
        { path: '/events', element: <EventsTab /> }
      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <RedirectToCohort /> },
        { path: '/all-courses', element: <AllCourses /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        {
          path: '/monthly-registrations',
          element: (
            <RoleBasedGuard accessibleRoles={adminRoles}>
              <AdminRegistrations />
            </RoleBasedGuard>
          )
        },
        {
          path: '/cohort_sales',
          element: (
            <RoleBasedGuard accessibleRoles={adminRoles}>
              <AdminSales />
            </RoleBasedGuard>
          )
        },
        {
          path: '/cohort_experiences',
          element: (
            <RoleBasedGuard accessibleRoles={adminRoles}>
              <AdminExperiences />
            </RoleBasedGuard>
          )
        },
        {
          path: '/waitlist_form',
          element: (
            <RoleBasedGuard accessibleRoles={adminRoles}>
              <WaitlistForm />
            </RoleBasedGuard>
          )
        },
        {
          path: '/alumni',
          element: (
            <RoleBasedGuard accessibleRoles={adminRoles}>
              <AlumniTab />
            </RoleBasedGuard>
          )
        },
        {
          path: '/surveys',
          element: (
            <RoleBasedGuard accessibleRoles={adminRoles}>
              <SurveyQuestionForm />
            </RoleBasedGuard>
          )
        },
        {
          path: 'user',
          children: [
            { path: 'account', element: <UserAccount /> },
            { path: 'referrals', element: <ReferralsPage /> }
          ]
        },
        {
          path: 'business-dashboard',
          element: (
            <RoleBasedGuard accessibleRoles={companyRoles}>
              <Dashboard />
            </RoleBasedGuard>
          )
        },
        {
          path: 'cohorts/:cohortID',
          children: [
            { path: '/', element: <RedirectToCohort /> },
            {
              path: '/peers',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <PeersTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/networking',
              element: (
                <RoleBasedGuard accessibleRoles={expertRoles}>
                  <NetworkingTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/sessions',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <SessionsTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/code',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <CodeTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/registrations',
              element: (
                <RoleBasedGuard accessibleRoles={expertRoles}>
                  <RegistrationsTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/attendance',
              element: (
                <RoleBasedGuard accessibleRoles={expertRoles}>
                  <AttendanceTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/messaging',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <Messaging />
                </RoleBasedGuard>
              )
            },
            {
              path: '/home',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <HomePage />
                </RoleBasedGuard>
              )
            },
            {
              path: '/Q&A',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <QnA />
                </RoleBasedGuard>
              )
            },
            {
              path: 'calendar-instructions',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <CalendarInstructions />
                </RoleBasedGuard>
              )
            },
            {
              path: 'onboarding-calendar-instructions',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <OnboardingCalendarInstructions />
                </RoleBasedGuard>
              )
            },
            {
              path: ':instructorName/analytics',
              element: (
                <RoleBasedGuard accessibleRoles={expertRoles}>
                  <AnalyticsTab />
                </RoleBasedGuard>
              )
            },
            {
              path: '/resources',
              element: (
                <RoleBasedGuard accessibleRoles={learnerRoles}>
                  <ResourcesPage />
                </RoleBasedGuard>
              )
            }
          ]
        },
        {
          path: 'paths/:pathSlug',
          children: [{ path: '/', element: <PathsTab /> }]
        }
      ]
    },

    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'payment', element: <Payment /> },
        { path: 'free-session-info', element: <FreeSessionInfo /> },
        { path: 'free-session-message', element: <FreeSessionMessage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
        { path: 'registration/unsubscribe', element: <UnsubscribeRegistration /> },
        { path: 'registration/defer', element: <DeferRegistration /> },
        { path: 'resource', element: <SharedResource /> }
      ]
    },
    {
      path: '*',
      element: <SphereNavbarLayout />,
      children: [{ path: 'cohorts/:cohortID/public_resources', element: <PublicResources /> }]
    },
    { path: 'registration', element: <Registration /> },
    { path: 'team-registration', element: <TeamRegistration /> },
    { path: 'teams/subscription_checkout', element: <CreditCheckout /> },
    { path: 'credit_checkout_invitation', element: <CreditCheckout /> },
    { path: 'teams/subscription_invite', element: <InvitePage /> },
    { path: 'expense-approval-checker', element: <ExpenseCheckerPage /> },
    { path: 'registration/personal-details', element: <PersonalDetailsForm /> },
    { path: 'registration/payment-options', element: <PaymentSelection /> },
    { path: 'registration/team-package-inquiry', element: <TeamPackageInquiry /> },
    { path: 'registration/course-invite', element: <CourseInvite /> },
    { path: 'registration/subscription-payment', element: <SubscriptionPayment /> },
    { path: 'registration/course-payment', element: <CoursePayment /> },
    { path: 'curriculum', element: <CurriculumPage /> },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/auth/*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const UpdatePassword = Loadable(lazy(() => import('../pages/authentication/UpdatePassword')));
const ResetUserPassword = Loadable(lazy(() => import('../pages/user_auth/ResetUserPassword')));
const UnlockUser = Loadable(lazy(() => import('../pages/user_auth/UnlockUser')));
const UnsubscribeEmails = Loadable(lazy(() => import('../pages/user_auth/UnsubscribeEmails')));
const UnsubscribeRegistration = Loadable(
  lazy(() => import('../pages/user_auth/UnsubscribeRegistration'))
);
const DeferRegistration = Loadable(lazy(() => import('../pages/user_auth/DeferRegistration')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const PeersTab = Loadable(lazy(() => import('../pages/dashboard/PeersTab')));
const Dashboard = Loadable(lazy(() => import('components/cohorts/businessCredit/Dashboard')));
const HomePage = Loadable(lazy(() => import('components/cohorts/home/HomeTab')));
const CalendarInstructions = Loadable(
  lazy(() => import('components/cohorts/onboarding/empty-states/CalendarInstructions'))
);
const OnboardingCalendarInstructions = Loadable(
  lazy(() => import('components/cohorts/home/OnboardingCalendarInstructions'))
);
const RegistrationsTab = Loadable(
  lazy(() => import('components/cohorts/registrations/RegistrationsTab'))
);
const AttendanceTab = Loadable(lazy(() => import('components/cohorts/attendance/AttendanceTab')));
const QnA = Loadable(lazy(() => import('components/cohorts/q&a/QnATab')));
const SessionsTab = Loadable(lazy(() => import('../pages/dashboard/cohorts/sessions/SessionsTab')));
const CodeTab = Loadable(lazy(() => import('../pages/dashboard/cohorts/code/CodeTab')));
const NetworkingTab = Loadable(
  lazy(() => import('../pages/dashboard/cohorts/networking/NetworkingTab'))
);
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const ReferralsPage = Loadable(lazy(() => import('../pages/referrals/ReferralsPage')));

// Main
const ContactUs = Loadable(lazy(() => import('../pages/ContactUs')));
const PublicContactUs = Loadable(lazy(() => import('../pages/public/PublicContactUS')));
const PublicMessaging = Loadable(lazy(() => import('../pages/public/PublicMessaging')));
const EventsTab = Loadable(lazy(() => import('../pages/events/EventsTab')));
const AllCourses = Loadable(lazy(() => import('../pages/curriculum/AllCourses')));
const PathsTab = Loadable(lazy(() => import('../pages/paths/PathsTab')));
const Messaging = Loadable(lazy(() => import('../pages/dashboard/cohorts/messaging/Messaging')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Registration = Loadable(lazy(() => import('../pages/registration/Registration')));
const PublicResources = Loadable(
  lazy(() => import('../pages/dashboard/cohorts/resources/PublicResources'))
);
const PersonalDetailsForm = Loadable(
  lazy(() => import('../pages/registration/PersonalDetailsPage'))
);
const PaymentSelection = Loadable(lazy(() => import('../pages/registration/PaymentSelectionPage')));
const SubscriptionPayment = Loadable(
  lazy(() => import('../pages/registration/SubscriptionPaymentPage'))
);
const CoursePayment = Loadable(lazy(() => import('../pages/registration/CoursePaymentPage')));
const CurriculumPage = Loadable(lazy(() => import('../pages/curriculum/CurriculumPage')));
const TeamRegistration = Loadable(
  lazy(() => import('../pages/subscription/teams/TeamRegistration'))
);
const TeamPackageInquiry = Loadable(lazy(() => import('../pages/registration/TeamPackageInquiry')));
const CourseInvite = Loadable(lazy(() => import('../pages/registration/CourseInvite')));
const CreditCheckout = Loadable(
  lazy(() => import('../pages/subscription/payments/CreditCheckout'))
);
const InvitePage = Loadable(lazy(() => import('../pages/subscription/teams/invite/InvitePage')));
const ExpenseCheckerPage = Loadable(
  lazy(() => import('../pages/expense_checker/ExpenseCheckerPage'))
);
const SharedResource = Loadable(lazy(() => import('../pages/SharedResource')));
const FreeSessionInfo = Loadable(lazy(() => import('../pages/registration/FreeSessionInfo')));
const FreeSessionMessage = Loadable(lazy(() => import('../pages/registration/FreeSessionMessage')));
const AdminRegistrations = Loadable(lazy(() => import('../pages/admin/RegistrationsTab')));
const AdminSales = Loadable(lazy(() => import('../pages/admin/SalesTab')));
const AdminExperiences = Loadable(lazy(() => import('../pages/admin/ExperiencesTab')));
const WaitlistForm = Loadable(lazy(() => import('../pages/admin/WaitlistForm')));
const SurveyQuestionForm = Loadable(lazy(() => import('../pages/admin/SurveyQuestionForm')));
const AlumniTab = Loadable(lazy(() => import('../pages/admin/AlumniTab')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
