import { Stack, Typography } from '@material-ui/core';
import ResourceCode from './ResourceCode';

function CodeList({ codeOnboardingItems }: { codeOnboardingItems: any }) {
  return (
    <Stack>
      <Typography variant="h3">Setup</Typography>
      {codeOnboardingItems.map((question: any) => (
        <ResourceCode
          key={question.id}
          itemID={question.id}
          isCompleted={question.is_completed}
          description={question.description}
          externalLink={question.external_link}
          isOptional={question.is_optional}
        />
      ))}
    </Stack>
  );
}

export default CodeList;
