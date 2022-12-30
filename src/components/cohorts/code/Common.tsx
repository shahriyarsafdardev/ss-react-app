import { Box, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#E2E8F0',
    width: '100%',
    padding: '15px'
  },
  openButton: {
    padding: '0 30px',
    borderRadius: '0px',
    fontSize: '18px'
  },
  checkedBox: {
    backgroundColor: '#E2E8F0'
  },
  unCheckedBox: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)'
  },
  font18: {
    fontSize: '18px'
  },
  ml60: {
    marginLeft: '60px'
  },
  checkbox: {
    padding: '0px',
    marginRight: '8px'
  },
  linkIcon: {
    marginLeft: '5px',
    width: '20px',
    height: '20px'
  },
  openItemLink: {
    position: 'absolute',
    bottom: '24px',
    borderRadius: '20px',
    padding: '6px 60px',
    [theme.breakpoints.down('md')]: {
      position: 'inherit',
      bottom: '0px',
      marginTop: '20px'
    }
  }
}));

export const ResourceBox = styled(Box)(({ theme }) => ({
  width: '50%',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  display: 'flex',
  gap: '32px',
  margin: '32px 0px',
  alignItems: 'strech',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column-reverse'
  }
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  width: '60%',
  padding: '24px 0px 40px 24px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

// MLS Code Page styled components
export const ContentRow = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  display: 'flex',
  gap: '20px',
  margin: '10px 0px',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column'
  }
}));

export const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#101658',
  lineHeight: '18px',
  letterSpacing: '1px',
  textTransform: 'capitalize',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  }
}));

export const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#101658',
  lineHeight: '21.15px',
  fontWeight: 'bold',
  paddingTop: '2px',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  }
}));

export const MLS_CODE_DATA = [
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    buttonLink:
      'https://colab.research.google.com/drive/1fzgE3UxaJjg_pmPSTxrli7iIT8-XCEvT?authuser=1#scrollTo=uCccODP3ME8-',
    subHeading: 'SESSION 1',
    mainHeading: 'What’s Relevant? and Loss Functions'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    buttonLink:
      'https://colab.research.google.com/drive/1lLV7TeiSvRgW8KnG_Qln3LBn14cSIc_E?authuser=1#scrollTo=_U0AFa1ms9lH',
    subHeading: 'SESSION 1',
    mainHeading: 'Manual Relevance Tuning'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    buttonLink: 'https://drive.google.com/file/d/1GsrlyJzXglVyd2hEthjZaxDE_J1c0D-k/edit?pli=1',
    subHeading: 'SESSION 2',
    mainHeading: 'LambdaMART'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    buttonLink:
      'https://colab.research.google.com/drive/1tU6WCNGvGx7w-cTymFACFDtHWd24YCB-?authuser=1#scrollTo=sgFjcGCsZZCQ',
    subHeading: 'SESSION 3',
    mainHeading: 'SDBN Click Model'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-3.svg',
    buttonLink:
      'https://docs.google.com/spreadsheets/d/1AyjK4BvQOHk_X0WnX9N0cT7Go92mtVcWznlsA2Dx8J0/edit?usp=sharing',
    subHeading: 'SESSION 3',
    mainHeading: 'LamdaMART Spreadsheet'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-3.svg',
    buttonLink:
      'https://docs.google.com/spreadsheets/d/1OWBxG4cAdpZvXgwqv0ieBn9fRBBCdatJXy9hCgVWras/edit?usp=sharing',
    subHeading: 'SESSION 3',
    mainHeading: 'Clicks to Judgment Spreadsheet'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    buttonLink:
      'https://colab.research.google.com/drive/1D1FClzAUGTobZzCDGukbiDOkIPwpVWJ_?authuser=1#scrollTo=kJN5ljcoSU23',
    subHeading: 'SESSION 4',
    mainHeading: 'Bayesian Optimization Notebook'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    buttonLink: 'https://colab.research.google.com/drive/15pTNfUxSDZRJbJig9CldxM-iYHdbjf2e',
    subHeading: 'SESSION 4',
    mainHeading: 'Feature Exploration and Active Learning'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-3.svg',
    buttonLink:
      'https://docs.google.com/spreadsheets/d/1E0OCLQqL9x-KaFBkJOTr_kx6cQXAyP7R0kesgfsFR3k',
    subHeading: 'SESSION 4',
    mainHeading: 'Bayesian Optimization Spreadsheet'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-2.svg',
    buttonLink: 'https://softwaredoug.com/blog/2022/09/11/using-elasticsearch-from-colab.html',
    subHeading: 'ALL SESSIONS',
    mainHeading: 'Bonsai Setup'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-3.svg',
    buttonLink:
      'https://miro.com/welcomeonboard/eEMzRVlWZmpDS2pvUjRMQjh6YXFFc0tpNkNSUTVwNDU1ZEVMQ[…]xZVVBQXwzNDU4NzY0NTI0MTcwMTk0ODQ1fDI=?share_link_id=811568322418',
    subHeading: 'ALL SESSIONS',
    mainHeading: 'Miro Setup'
  },
  {
    imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-3.svg',
    buttonLink:
      'https://docs.google.com/spreadsheets/d/1A7Vh65KJ3C8aR9U34PtKEdOnDoUMZ_WvGjEVR0DsGzc/edit?usp=sharing',
    subHeading: 'ALL SESSIONS',
    mainHeading: 'Topics Request Spreadsheet'
  }
];
