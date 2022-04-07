import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addUserAction } from '../../store/actions/roomActions';

export const useCreateRoomPage = () => {
  const { socket } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const router = useHistory();

  const addUserStore = async (res) => {
    dispatch(addUserAction(res));
  };

  const goToLobbyPage = () => {
    socket.send(
      JSON.stringify({
        method: 'connection',
        nickname: localStorage.getItem('nickname'),
        id: localStorage.getItem('roomId'),
      })
    );

    router.push(`/lobbyPage/${localStorage.getItem('roomId')}`);
  };

  return {
    addUserStore,
    goToLobbyPage,
  };
};
