const BASE_URL = 'http://localhost:3000/api';
import { axiosInstance } from '../shared/axiosInstance';

export default class UserApi {
  static async refreshTokens() {
    const { data } = await axiosInstance.get('/auth/refresh');
    return data;
  }

  static async signUp(userData) {
    try {
      const { data } = await axiosInstance.post('/auth/signup', userData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async signIn(userData) {
    try {
      const { data } = await axiosInstance.post('/auth/signin', userData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async signOut() {
    const { data } = await axiosInstance.get('/auth/signout');
    return data;
  }
}