import { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Message from '../../Message';

type DescriptionProps = {
  innerContent: string;
  onTrack: Function;
  resourcesPresent: Boolean | undefined;
};

const DescriptionContainer = styled(Container)(({ theme }) => ({
  whiteSpace: 'break-spaces',
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  ul: {
    marginLeft: '25px'
  },
  marginBottom: '15px'
}));

export default function Description({ innerContent, onTrack, resourcesPresent }: DescriptionProps) {
  useEffect(() => {
    if (innerContent) {
      onTrack('Resources Page - Description - Tab Opened', {});

      const resources = document.getElementById('resources')?.getElementsByTagName('a');

      if (resources) {
        const resourcesArray = Array.from(resources);
        resourcesArray.forEach((el) => {
          el.addEventListener('click', () => {
            onTrack('Resources Page - Description - Link Opened', { Link: el?.href });
          });
        });
      }
    }
  }, [innerContent]);

  return (
    <DescriptionContainer id="resources">
      {!innerContent && !resourcesPresent ? (
        <Message content="The session resources will be available 2 days before the session." />
      ) : (
        <div data-testid="session-description" dangerouslySetInnerHTML={{ __html: innerContent }} />
      )}
    </DescriptionContainer>
  );
}
