import { Container } from '@material-ui/core';
import MLSCodeRow from './MLSCodeRow';

function MLSCodeList() {
  const MLS_CODE_DATA = [
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
  return (
    <Container>
      {MLS_CODE_DATA.map((row) => (
        <MLSCodeRow key={row.mainHeading} data={row} />
      ))}
    </Container>
  );
}

export default MLSCodeList;
