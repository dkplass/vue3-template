import { IRoleData } from '../../src/interface/IRole';
import { faker } from '@faker-js/faker';
import { Response, Request } from 'express';

const roles: IRoleData[] = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: []
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: []
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: []
  }
];

export const getRoles = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    body: {
      total: roles.length,
      items: roles
    }
  });
};

export const createRole = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    body: {
      key: faker.number.float({ min: 3, max: 10000 })
    }
  });
};

export const updateRole = (req: Request, res: Response) => {
  const { role } = req.body;
  return res.json({
    code: 20000,
    body: {
      role
    }
  });
};

export const deleteRole = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  });
};

export const getRoutes = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    body: {
      routes: []
    }
  });
};
