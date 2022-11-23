import { useState } from 'react';
import Page from 'components/Page';
import CurriculumHeader from './CurriculumHeader';
import CurriculumTabs from './CurriculumTabs';
import { TOPICS } from './Common';

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [courses, setCourses] = useState<any>([]);

  const applyFilters = (tab: number) => {
    const topic = TOPICS[tab];
    let filteredCourses: any = [];
    if (topic) {
      filteredCourses = courses?.filter((course: any) => course.topic === topic);
    }
    return filteredCourses;
  };
  return (
    <Page paddingX="72px">
      <CurriculumHeader />
      <CurriculumTabs
        currentTab={activeTab}
        setActiveTab={(value: number) => setActiveTab(value)}
      />
    </Page>
  );
}
