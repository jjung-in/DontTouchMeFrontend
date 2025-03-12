import axios from 'axios';

const server = import.meta.env.VITE_API_KEY;

export const getRefreshToken = async () => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const result = await axios.post(
    `${server}/jwt/reissue`,
    {
      refreshToken,
    },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return result.data;
};
