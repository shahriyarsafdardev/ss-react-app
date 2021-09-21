import mock from './mock';

mock.onGet('/cohorts').reply((config) => {
  try {
    const cohortsData = [
      {
        id: 'cohort-1',
        name: 'The Economics of Digital Platforms'
      }
      // {
      //   id: 'cohort-2',
      //   name: 'The Economics of Space'
      // }
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
      cohort_id: 'cohort-1',
      peers: [
        {
          id: '1',
          first_name: 'Alex',
          last_name: 'Morris',
          email: 'alexmorris@upwork.com',
          linkedin_url: 'https://www.linkedin.com/in/alexbmorris',
          current_company: {
            id: '1',
            name: 'Upwork',
            logo_url:
              'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fda8c49d6-3469-4fae-a73b-cd0f0047e302%2F1620158724382.jpeg?table=block&id=68040bb3-1bd5-45d9-bfa7-3b12beb5f9b4&spaceId=d52b48d6-fbc8-4589-85c0-3e9c7fc054ea&width=250&userId=3734889d-2558-4260-87c8-03a9d6e57531&cache=v2'
          },
          current_position: 'Product Designer',
          strengths: [
            {
              name: 'Design Thinking',
              color: 'blue'
            },
            {
              name: 'UX Design',
              color: 'blue'
            },
            {
              name: 'Product Design',
              color: 'blue'
            }
          ],
          interests: [
            {
              name: 'Networking',
              color: 'warning'
            }
          ],
          profile_image_url:
            'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f8e0dbed-48c7-4b17-908b-618b271b52dd/1516925807774.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210919%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210919T205726Z&X-Amz-Expires=86400&X-Amz-Signature=75fd4fce726a9c386f3142d2dceb352bad9e9d27f4bee587d5b39b07aa4bc5c6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%221516925807774.jpeg%22'
        },
        {
          id: '2',
          first_name: 'Angelika',
          last_name: 'Welte',
          email: 'awelte@bank-banque-canada.ca',
          linkedin_url: 'https://www.linkedin.com/in/angelika-welte-a8132159/',
          current_company: {
            id: '2',
            name: 'Bank of Canada',
            logo_url:
              'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc5ee2e94-3ddc-4dc6-8f4f-bf1c28fef3ea%2Fbank_of_canada.png?table=block&id=01fe4902-7ee5-423f-911b-877030e38eb1&spaceId=d52b48d6-fbc8-4589-85c0-3e9c7fc054ea&width=250&userId=3734889d-2558-4260-87c8-03a9d6e57531&cache=v2'
          },
          current_position: 'Senior Economist',
          strengths: [
            {
              name: 'Payment Methods',
              color: 'blue'
            },
            {
              name: 'Econometrics and Statistics',
              color: 'blue'
            }
          ],
          interests: [
            {
              name: 'Network',
              color: 'warning'
            },
            {
              name: 'Discuss Materials',
              color: 'warning'
            }
          ],
          profile_image_url:
            'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4ccb7cb7-aeec-4e63-86a1-8867cfd4c243%2F1517237806932.jpeg?table=block&id=01fe4902-7ee5-423f-911b-877030e38eb1&spaceId=d52b48d6-fbc8-4589-85c0-3e9c7fc054ea&width=600&userId=3734889d-2558-4260-87c8-03a9d6e57531&cache=v2'
        },
        {
          id: '3',
          first_name: 'Meng',
          last_name: 'Zhang',
          email: 'mengzhang@upwork.com',
          linkedin_url: 'https://www.linkedin.com/in/mengzhangdartmouth/',
          current_company: {
            id: 'uuid',
            name: 'Upwork',
            logo_url:
              'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fda8c49d6-3469-4fae-a73b-cd0f0047e302%2F1620158724382.jpeg?table=block&id=68040bb3-1bd5-45d9-bfa7-3b12beb5f9b4&spaceId=d52b48d6-fbc8-4589-85c0-3e9c7fc054ea&width=250&userId=3734889d-2558-4260-87c8-03a9d6e57531&cache=v2'
          },
          current_position: 'Principal Product Analyst',
          strengths: [
            {
              name: 'Product Testing',
              color: 'blue'
            },
            {
              name: 'Web Analytics',
              color: 'blue'
            }
          ],
          interests: [
            {
              name: 'Mentor',
              color: 'warning'
            },
            {
              name: 'Network',
              color: 'warning'
            },
            {
              name: 'Discuss Materials',
              color: 'warning'
            }
          ],
          profile_image_url:
            'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F22521638-236d-434f-bc47-31fd6cc20214%2F1516902895564.jpeg?table=block&id=c328f9c6-3b2e-40bf-bdaf-b0a2e75c37f7&spaceId=d52b48d6-fbc8-4589-85c0-3e9c7fc054ea&width=600&userId=3734889d-2558-4260-87c8-03a9d6e57531&cache=v2'
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
          id: '1',
          first_name: 'Person',
          last_name: 'A',
          email: 'abc@gmail.com',
          current_company: {
            id: '1',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: [
            {
              name: 'Strength A',
              color: 'success'
            }
          ],
          interests: [
            {
              name: 'Interest A',
              color: 'default'
            }
          ],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        },
        {
          id: '2',
          first_name: 'Person',
          last_name: 'B',
          email: 'abc@gmail.com',
          current_company: {
            id: '2',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: [
            {
              name: 'Strength B',
              color: 'blue'
            }
          ],
          interests: [
            {
              name: 'Interest B',
              color: 'error'
            }
          ],
          profile_image_url:
            'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'
        },
        {
          id: '3',
          first_name: 'Person',
          last_name: 'C',
          email: 'abc@gmail.com',
          current_company: {
            id: '3',
            name: 'Company',
            logo_url:
              'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png'
          },
          current_position: 'System Engineer',
          strengths: [
            {
              name: 'Strength A',
              color: 'error'
            }
          ],
          interests: [
            {
              name: 'Interest A',
              color: 'warning'
            }
          ],
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

mock.onGet('/cohorts/cohort-1/sessions').reply((config) => {
  try {
    const sessionsData = {
      cohort_id: 'cohort-1',
      sessions: [
        {
          id: 'uuid',
          name: 'Network Effects and Economics of Digital Platforms',
          number: 1,
          length: '150m',
          datetime: '2021-10-13 02:38:46.101611',
          description: 'block of html',
          summary: 'block of html',
          slides: [
            'https://www.slideteam.net/media/catalog/product/cache/960x720/e/x/example_presentation_of_product_powerpoint_presentation_slides_Slide48.jpg',
            'https://www.slideteam.net/media/catalog/product/cache/960x720/p/r/problem_management_approach_good_ppt_example_Slide01.jpg',
            'https://www.slideteam.net/media/catalog/product/cache/960x720/e/x/example_presentation_of_product_powerpoint_presentation_slides_Slide13.jpg'
          ],
          survey: {
            submitted: true,
            contents: [
              {
                type: 'multiple-choice',
                title: '1 - How did you rate the course?',
                options: ['Loved it', 'It was okay'],
                submitted_answer: 'Loved it'
              },
              {
                type: 'text-input',
                title: '2 - Describe your favourite part?',
                submitted_answer: 'My favourite part was ...'
              }
            ]
          }
        },
        {
          id: 'uuid',
          name: 'Session number 2 testing',
          number: 2,
          length: '80m',
          datetime: '2020-11-26 19:45:46.101611',
          description: 'block of html',
          summary: 'block of html',
          slides: [
            'https://www.slideteam.net/media/catalog/product/cache/960x720/e/x/example_presentation_of_product_powerpoint_presentation_slides_Slide48.jpg',
            'https://www.slideteam.net/media/catalog/product/cache/960x720/p/r/problem_management_approach_good_ppt_example_Slide01.jpg',
            'https://www.slideteam.net/media/catalog/product/cache/960x720/e/x/example_presentation_of_product_powerpoint_presentation_slides_Slide13.jpg'
          ],
          survey: {
            submitted: true,
            contents: [
              {
                type: 'multiple-choice',
                title: '1. How did you rate the course?',
                options: ['Loved it', 'It was okay'],
                submitted_answer: 'Loved it'
              },
              {
                type: 'text-input',
                title: '1. Describe your favourite part?',
                submitted_answer: 'My favourite part was ...'
              }
            ]
          }
        },
        {
          id: 'uuid',
          name: 'Session number 3 testing',
          number: 3,
          length: '120m',
          datetime: '2020-11-22 19:45:46.101611',
          description: 'block of html',
          summary: 'block of html',
          slides: [
            'https://www.slideteam.net/media/catalog/product/cache/960x720/e/x/example_presentation_of_product_powerpoint_presentation_slides_Slide48.jpg',
            'https://www.slideteam.net/media/catalog/product/cache/960x720/p/r/problem_management_approach_good_ppt_example_Slide01.jpg',
            'https://www.slideteam.net/media/catalog/product/cache/960x720/e/x/example_presentation_of_product_powerpoint_presentation_slides_Slide13.jpg'
          ],
          survey: {
            submitted: true,
            contents: [
              {
                type: 'multiple-choice',
                title: '1. How did you rate the course?',
                options: ['Loved it', 'It was okay'],
                submitted_answer: 'Loved it'
              },
              {
                type: 'text-input',
                title: '1. Describe your favourite part?',
                submitted_answer: 'My favourite part was ...'
              }
            ]
          }
        }
      ]
    };

    return [200, { sessionsData }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
