import MockAdapter from 'axios-mock-adapter';

export default (mock: MockAdapter) => {
  mock.onPost('getProductsSmall').reply(200, {});

  mock.onPost('getProducts').reply(200, {
    body: {
      userid: 'hans',
      name: 'Hans',
      avatarUrl: '',
      intro: '',
      roles: ['admin'],
      email: ''
    }
  });
};
