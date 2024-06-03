import axios from 'axios';
import type { IRoleData } from '@/interface/IRole';

export default {
  /**
   *
   * @returns
   */
  getRoles: async function (): Promise<{ total: number; items: IRoleData[] }> {
    const result = await axios.get('/role/getRoles');
    return result.data.body;
  },
  /**
   *
   * @returns
   */
  createRole: async function () {
    const result = await axios.post('/role/createRole');
    return result.data.body;
  },
  /**
   *
   * @returns
   */
  updateRole: async function () {
    const result = await axios.post('role/updateRole');
    return result.data.body;
  },
  /**
   *
   * @returns
   */
  deleteRole: async function () {
    const result = await axios.post('role/deleteRole');
    return result.data.body;
  },
  /**
   *
   * @returns
   */
  getRoutes: async function () {
    const result = await axios.get('role/getRoutes');
    return result.data.body;
  }
};
