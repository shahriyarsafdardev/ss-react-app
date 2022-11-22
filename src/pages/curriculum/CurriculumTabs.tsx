import { useState } from 'react';
import { CurriculumTab, CurriculumTabsNavBar } from './Common';

export default function CurriculumTabs() {
  const [value, setValue] = useState(0);
  const setActiveTab = (value: number) => {
    setValue(value);
  };
  return (
    <CurriculumTabsNavBar value={value} onChange={(e, value) => setActiveTab(value)}>
      <CurriculumTab label="DATA ANALYSIS & EXPERIMENTATION" onClick={() => setActiveTab(0)} />
      <CurriculumTab label="ML Systems" onClick={() => setActiveTab(1)} />
      <CurriculumTab label="Data Infrastructure" onClick={() => setActiveTab(2)} />
      <CurriculumTab label="Data Essentials" onClick={() => setActiveTab(3)} />
    </CurriculumTabsNavBar>
  );
}
