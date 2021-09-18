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
          first_name: 'Marry',
          last_name: 'Dawn',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        },
        {
          id: 'uuid',
          first_name: 'Marry',
          last_name: 'Dawn',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        },
        {
          id: 'uuid',
          first_name: 'Marry',
          last_name: 'Dawn',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        }
      ]
    };

    return [200, { peersData }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/cohorts/cohort-2/peers').reply((config) => {
  try {
    const peersData = {
      id: 'cohort-2',
      peers: [
        {
          id: 'uuid',
          first_name: 'Person',
          last_name: 'A',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        },
        {
          id: 'uuid',
          first_name: 'Person',
          last_name: 'B',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        },
        {
          id: 'uuid',
          first_name: 'Person',
          last_name: 'C',
          current_company: {
            id: 'uuid',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: ['Strength A', 'Strength B', 'Strength C'],
          interests: ['interest A', 'Interest B', 'Interest C'],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        }
      ]
    };

    return [200, { peersData }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
