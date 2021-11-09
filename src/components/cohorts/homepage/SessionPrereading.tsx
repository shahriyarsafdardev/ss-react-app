import { Table, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { SectionContainer } from './Common';
import PreReadingRow from './PreReadingRow';
import { PreReadingList } from '../../../@types/cohorts';

const containerStyle = {
  minWidth: '49%',
  minHeight: '400px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px'
};

type SessionPrereadingProps = {
  list: PreReadingList[];
};

const SessionPrereading = ({ list }: SessionPrereadingProps) => {
  console.log(list);
  return (
    // <SectionContainer style={containerStyle}>
    //   {list.map((preReading, index) => (
    //     <PreReadingRow key={index} item={preReading} />
    //   ))}
    //   <div>Session prereadings</div>
    // </SectionContainer>
    <TableContainer sx={{ maxWidth: '479px' }} style={containerStyle}>
      <Table>
        <TableBody id="peer-list-container" data-testid="peers-list">
          {list.map((preReading, index) => (
            <PreReadingRow key={index} item={preReading} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionPrereading;
