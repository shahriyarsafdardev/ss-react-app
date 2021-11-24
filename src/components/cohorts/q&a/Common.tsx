import { styled } from '@material-ui/core/styles';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.newQuestion': {
    marginLeft: '10px'
  },
  '&.filters': {
    height: '250px',
    marginTop: '20px'
  },
  '&.about': {
    height: '340px'
  }
}));
