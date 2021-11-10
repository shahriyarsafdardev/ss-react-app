import { Box } from '@material-ui/core';
import { SectionContainer } from './Common';
import PreReadingRow from './PreReadingRow';
import { PreReadingList } from '../../../@types/cohorts';
import CircularProgressbar from './CircularProgressBar';

type SessionPrereadingProps = {
  list: PreReadingList[];
  onListChange: Function;
};

const SessionPrereading = ({ list, onListChange }: SessionPrereadingProps) => {
  const onMark = (index: number, value: boolean) => {
    if (index >= 0 && index < list.length) {
      const updated = list;
      updated[index].complete = value;
      onListChange([...updated]);
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
            strokeWidth={14}
            totalSteps={list.length}
            completedSteps={list.filter((item) => item.complete === true).length}
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
