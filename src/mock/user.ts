import MockAdapter from 'axios-mock-adapter';
import { v4 as uuidv4 } from 'uuid';

export default (mock: MockAdapter) => {
  mock.onPost('login').reply(200, uuidv4());

  mock.onPost('getUserProfile').reply(200, {
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
