import { Box } from '@material-ui/core';
import { SectionContainer } from './Common';
import PreReadingRow from './PreReadingRow';
import { PreReadingList } from '../../../@types/cohorts';
import CircularProgressbar from './CircularProgressBar';

type SessionPrereadingProps = {
  list: PreReadingList[];
  onListChange: Function;
  totalItems: number;
  completedItems: number;
};

const SessionPrereading = ({
  list,
  onListChange,
  totalItems,
  completedItems
}: SessionPrereadingProps) => {
  const onMark = (index: number, value: boolean) => {
    if (index >= 0 && index < list.length) {
      list[index].complete = value;
      onListChange(list);
    }
  };

  return (
    <SectionContainer className="card-2">
      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Box>
          <p style={{ fontSize: '18px' }}>
            Get Ready for <span style={{ color: '#4D4DCD', fontWeight: 'bold' }}>Session 2</span>
          </p>
          <p style={{ fontSize: '14px' }}>
            These tasks should be completed before the session starts
          </p>
        </Box>
        <Box>
          <CircularProgressbar
            key="progress"
            strokeWidth={14}
            totalSteps={totalItems}
            completedSteps={completedItems}
          />
        </Box>
      </Box>
      <Box style={{ height: '400px', overflow: 'scroll' }}>
        {list.map((preReading, index) => (
          <PreReadingRow
            key={index}
            item={preReading}
            checkboxHanlder={(value: boolean) => onMark(index, value)}
          />
        ))}
      </Box>
    </SectionContainer>
  );
};

export default SessionPrereading;
