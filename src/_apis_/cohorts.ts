// utils
import fakeRequest from '../utils/fakeRequest';
//
import mock from './mock';

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

mock.onGet('/cohorts/cohort-1/peers').reply((config) => {
  try {
    const peersData = {
      id: 'cohort-1',
      peers: [
        {
          id: 'uuid',
          first_name: 'First Name',
          last_name: 'Last Name',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url: 'logo_url'
          },
          current_position: 'Position',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg'
        }
      ]
    };

    return [200, { peersData }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
