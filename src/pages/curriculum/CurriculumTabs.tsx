import { TOPICS, CurriculumTab, CurriculumTabsNavBar } from './Common';

export default function CurriculumTabs({
  currentTab,
  setActiveTab
}: {
  currentTab: number;
  setActiveTab: Function;
}) {
  return (
    <CurriculumTabsNavBar value={currentTab} onChange={(e, value) => setActiveTab(value)}>
      <CurriculumTab label={TOPICS[0]} onClick={() => setActiveTab(0)} />
      <CurriculumTab label={TOPICS[1]} onClick={() => setActiveTab(1)} />
      <CurriculumTab label={TOPICS[2]} onClick={() => setActiveTab(2)} />
      <CurriculumTab label={TOPICS[3]} onClick={() => setActiveTab(3)} />
    </CurriculumTabsNavBar>
  );
}
