import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addRoomAction, addUserAction } from '../../store/actions/roomActions';
import { getRoom } from '../../api/room';

export const useLobbyPage = (props) => {
  const dispatch = useDispatch();
  const router = useHistory();
  const { room, socket } = useSelector((state) => state.room);
  const nickname = localStorage.getItem('nickname');
  const userId = localStorage.getItem('userId');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUserExists, setIsUserExists] = useState(null);

  const updateStoreRoom = () => {
    socket.send(
      JSON.stringify({
        method: 'addUser',
        id: room._id,
        user: {
          userId: localStorage.getItem('userId'),
          role: 'player',
          nickname: localStorage.getItem('nickname'),
          cards: [],
        },
      })
    );
  };

  const isUserExistsCheck = () => {
    room?.users.forEach((user) => {
      if (user.userId === userId) {
        setIsUserExists(true);
        return true;
      }
      setIsUserExists(false);
      return false;
    });
  };

  const exitGame = () => {
    localStorage.clear();
    router.push('/');
    window.location.reload();
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const getRoomIdFromLS = () => {
    return localStorage.getItem('roomId');
  };

  const addRoomStore = async (res) => {
    dispatch(addRoomAction(res));
  };

  const addUserStore = async (res) => {
    dispatch(addUserAction(res));
  };

  const clearLS = () => {
    localStorage.clear();
  };

  useEffect(() => {
    isUserExistsCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  useEffect(() => {
    if (room && room.users.length === room.numberOfPlayers) {
      router.push(`/gamePage/${localStorage.getItem('roomId')}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  useEffect(() => {
    if (socket?.readyState === 1) {
      socket.send(
        JSON.stringify({
          method: 'connection',
          nickname: localStorage.getItem('nickname'),
          id: localStorage.getItem('roomId'),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket?.readyState]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        if (JSON.parse(event.data).users) {
          addRoomStore(JSON.parse(event.data));
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    async function fetchData() {
      const res = await getRoom(props.match.params.id);
      addRoomStore(res.data);

      res.data.users.map((user) => {
        if (user.nickname === localStorage.getItem('nickname')) {
          addUserStore(user);
        }
        return null;
      });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    room,
    nickname,
    updateStoreRoom,
    getRoomIdFromLS,
    clearLS,
    exitGame,
    isOpenModal,
    openModal,
    closeModal,
    isUserExists,
  };
};
