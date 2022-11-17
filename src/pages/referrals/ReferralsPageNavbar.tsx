import { TabsNavBar, NavbarTab } from './Common';

export default function ReferralsPageNavbar({ setActiveTab }: { setActiveTab: Function }) {
  return (
    <TabsNavBar>
      <NavbarTab label="Referrals" onClick={() => setActiveTab(0)} />
      <NavbarTab label="Subscription" onClick={() => setActiveTab(1)} />
      <NavbarTab label="Balance History" onClick={() => setActiveTab(2)} />
    </TabsNavBar>
  );
}
