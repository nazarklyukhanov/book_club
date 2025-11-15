import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

console.log(import.meta.env.VITE_API_URL);

let accessToken = '';

export function setAccessToken(newAccessToken) {
  accessToken = newAccessToken;
}

axiosInstance.interceptors.request.use((config) => {
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const previousRequest = error.config;

    if (error.response?.status === 403 && !previousRequest.sent) {
      previousRequest.sent = true;
      try {
        const { data } = await axiosInstance.get('/auth/refresh');
        const newToken = data.data.accessToken;
        setAccessToken(newToken);
        previousRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(previousRequest);
      } catch (error) {
        setAccessToken('');
        window.location.href = '/auth';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);