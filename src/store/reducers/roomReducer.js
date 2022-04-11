const initialValues = {
  user: null,
  room: null,
  socket: null, // new WebSocket('wss://lit-dawn-13539.herokuapp.com'), // ws://localhost:5001 || wss://lit-dawn-13539.herokuapp.com
};

export const roomReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return { ...state, room: action.payload };

    case 'ADD_USER':
      return { ...state, user: action.payload };

    case 'ADD_SOCKET': {
      return { ...state, socket: action.payload };
    }

    default:
      return state;
  }
};
