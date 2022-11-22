import Page from 'components/Page';
import CurriculumHeader from './CurriculumHeader';
import CurriculumTabs from './CurriculumTabs';

export default function CurriculumPage() {
  return (
    <Page paddingX="72px">
      <CurriculumHeader />
      <CurriculumTabs />
    </Page>
  );
}
