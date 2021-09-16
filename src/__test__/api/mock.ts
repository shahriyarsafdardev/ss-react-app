import axios from 'axios';
import mock from '../../_apis_/mock';

mock.onGet('/cohorts').reply((config) => {
  try {
    const cohortsData = [
      {
        id: 'cohort-1',
        name: 'The Economics of Digital Platforms'
      },
      {
        id: 'cohort-2',
        name: 'Investing in the BlockChain'
      },
      {
        id: 'cohort-3',
        name: 'How can data science drive decision making?'
      }
    ];
    return [200, { cohortsData }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
