import { TabsNavBar, NavbarTab } from './Common';

export default function ReferralsPageNavbar({
  activeTab,
  setActiveTab
}: {
  activeTab: number;
  setActiveTab: Function;
}) {
  return (
    <TabsNavBar value={activeTab} onChange={(e, value) => setActiveTab(value)}>
      <NavbarTab label="Referrals" onClick={() => setActiveTab(0)} />
      <NavbarTab label="Subscription" onClick={() => setActiveTab(1)} />
      <NavbarTab label="Balance History" onClick={() => setActiveTab(2)} />
    </TabsNavBar>
  );
}
