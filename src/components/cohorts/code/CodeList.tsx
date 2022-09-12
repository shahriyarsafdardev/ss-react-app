import { Stack, Typography } from '@material-ui/core';
import { HTP_SETUP_QUESTIONS_FIRST, HTP_SETUP_QUESTIONS_LAST } from './Common';
import ResourceCode from './ResourceCode';

function CodeList() {
  return (
    <Stack>
      <Typography variant="h3">Setup</Typography>
      {HTP_SETUP_QUESTIONS_FIRST.map((question) => (
        <ResourceCode
          key={question.key}
          checked={true}
          title={question.title}
          openLink={question.link}
        />
      ))}
      {HTP_SETUP_QUESTIONS_LAST.map((question) => (
        <ResourceCode
          key={question.key}
          checked={true}
          title={question.title}
          openLink={question.link}
        />
      ))}
    </Stack>
  );
}

export default CodeList;
