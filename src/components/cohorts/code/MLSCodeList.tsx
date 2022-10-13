import { Container } from '@material-ui/core';
import MLSCodeRow from './MLSCodeRow';

function MLSCodeList() {
  const MLS_CODE_DATA = [
    {
      imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
      buttonLink: 'https://colab.research.google.com/drive/1fzgE3UxaJjg_pmPSTxrli7iIT8-XCEvT?authuser=1#scrollTo=uCccODP3ME8-',
      subHeading: 'SESSION 1',
      mainHeading: 'What’s Relevant? and Loss Functions'
    },
    {
      imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
      buttonLink: 'https://colab.research.google.com/drive/1lLV7TeiSvRgW8KnG_Qln3LBn14cSIc_E?authuser=1#scrollTo=_U0AFa1ms9lH',
      subHeading: 'SESSION 1',
      mainHeading: 'Manual Relevance Tuning'
    },
    // {
    //   imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    //   buttonLink: 'https://3.com',
    //   subHeading: 'SESSION 3',
    //   mainHeading: 'LambdaMART'
    // },
    // {
    //   imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    //   buttonLink: 'https://4.com',
    //   subHeading: 'SESSION 4',
    //   mainHeading: 'Bayesian Optimization'
    // },
    // {
    //   imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-1.svg',
    //   buttonLink: 'https://5.com',
    //   subHeading: 'SESSION 5',
    //   mainHeading: 'Learning to Rank and Active Learning'
    // },
    {
      imgURL: 'https://sphere-public.s3.eu-west-2.amazonaws.com/mls-code-logo-2.svg',
      buttonLink: 'https://softwaredoug.com/blog/2022/09/11/using-elasticsearch-from-colab.html',
      subHeading: 'ALL SESSIONS',
      mainHeading: 'Bonsai'
    }
  ];
  return (
    <Container>
      {MLS_CODE_DATA.map((row) => (
        <MLSCodeRow key={row.subHeading} data={row} />
      ))}
    </Container>
  );
}

export default MLSCodeList;
