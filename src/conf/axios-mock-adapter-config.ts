import mockUser from '@/mock/user';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mockUser(mock);
