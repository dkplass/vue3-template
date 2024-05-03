import { IUserProfile } from '../src/interface/IUserProfile';
import { faker } from '@faker-js/faker';
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

let userStore: IUserProfile | null = null;

const userList: IUserProfile[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin']
  },
  {
    id: 1,
    username: 'editor',
    password: 'any',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor']
  }
];

const userCount = 100;

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: 1,
    username: `user_${faker.string.alphanumeric(9)}`,
    password: faker.string.alphanumeric(20),
    name: faker.person.fullName(),
    avatar: faker.image.url(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    roles: ['visitor']
  });
}

export const register = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  });
};

export const login = (req: Request, res: Response) => {
  const { username } = req.body;
  for (const user of userList) {
    if (user.username === username) {
      userStore = user;

      return res.json({
        code: 20000,
        body: uuidv4()
      });
    }
  }

  return res.status(404).json({
    code: 50004,
    message: 'Invalid User'
  });
};

export const logout = (req: Request, res: Response) => {
  userStore = null;

  return res.json({
    code: 20000
  });
};

export const getUser = (req: Request, res: Response) => {
  const { name } = req.query;
  const users = userList.filter((user) => {
    const lowerCaseName = user.name.toLowerCase();
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0);
  });

  return res.json({
    code: 20000,
    body: users
  });
};

export const getUserProfile = (req: Request, res: Response) => {
  // get token
  // req.header('X-Access-Token')
  return res.json({
    code: 20000,
    body: userStore
  });
};
