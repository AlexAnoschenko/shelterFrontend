import axios from 'axios';
import appConfig from '../config';

export const createRoom = async ({ nickname, numberOfPlayers }) => {
  const res = await axios.post(
    `${appConfig.API_URL}/rooms/createRoom`,
    {
      nickname,
      numberOfPlayers,
    }
  );

  localStorage.setItem('roomId', res.data.roomId);
  localStorage.setItem('userId', res.data.user.userId);
  localStorage.setItem('nickname', res.data.user.nickname);

  return res;
};

export const getRoom = async (id) => {
  const res = await axios.get(`${appConfig.API_URL}/rooms/getRoom`, {
    params: { id },
  });

  if (localStorage.getItem('roomId')) {
    localStorage.setItem('roomId', id);
  }

  return res;
};

export const createUser = async ({ nickname, id }) => {
  const res = await axios.post(
    `${appConfig.API_URL}/rooms/createUser`,
    {
      nickname,
      id,
    }
  );

  localStorage.setItem('roomId', res.data.roomId);
  localStorage.setItem('userId', res.data.user.userId);
  localStorage.setItem('nickname', res.data.user.nickname);

  return res;
};
