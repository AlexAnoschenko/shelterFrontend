export const fetchRoom = () => {
  return function (dispatch) {};
};

export const addRoomAction = (payload) => ({
  type: 'ADD_ROOM',
  payload,
});

export const addUserAction = (payload) => ({
  type: 'ADD_USER',
  payload,
});

export const addSocketAction = (payload) => ({
  type: 'ADD_SOCKET',
  payload,
});
