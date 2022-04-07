import axios from 'axios';
import appConfig from '../config';

export const getCards = async (id) => {
  const res = await axios.post(
    `${appConfig.API_URL}/cards/getCards`,
    {
      params: { id },
    }
  );

  return res;
};
