import { Container } from '@material-ui/core';
import MLSCodeRow from './MLSCodeRow';
import { MLS_CODE_DATA } from './Common';

function MLSCodeList() {
  return (
    <Container>
      {MLS_CODE_DATA.map((row) => (
        <MLSCodeRow key={row.mainHeading} data={row} />
      ))}
    </Container>
  );
}

export default MLSCodeList;
