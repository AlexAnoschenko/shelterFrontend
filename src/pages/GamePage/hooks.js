import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getRoom } from '../../api/room';
import { addRoomAction, addUserAction } from '../../store/actions/roomActions';

export const useGamePage = (props) => {
  const router = useHistory();
  const dispatch = useDispatch();
  const { user, room, socket } = useSelector((state) => state.room);
  const [currentPlayer, setCurrentPlayer] = useState(
    localStorage.getItem('nickname')
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openCard = (card) => {
    socket.send(
      JSON.stringify({
        method: 'openCard',
        id: room._id,
        user: {
          userId: localStorage.getItem('userId'),
          nickname: localStorage.getItem('nickname'),
          card: card,
        },
      })
    );
  };

  const openSpecialCard = (card) => {
    let selectedUser = null;

    room.users.forEach((user) => {
      if (user.nickname === selectedPlayer) {
        selectedUser = user;
      }
    });

    switch (card.action) {
      case 'exchange':
        socket.send(
          JSON.stringify({
            method: 'openSpecialExchangeCard',
            id: room._id,
            user: {
              userId: localStorage.getItem('userId'),
              nickname: localStorage.getItem('nickname'),
              card: card,
            },
            selectedUser: selectedUser,
          })
        );
        break;

      case 'opening':
        socket.send(
          JSON.stringify({
            method: 'openSpecialOpeningCard',
            id: room._id,
            user: {
              userId: localStorage.getItem('userId'),
              nickname: localStorage.getItem('nickname'),
              card: card,
            },
            selectedUser: selectedUser,
          })
        );
        break;

      case 'shuffle':
        socket.send(
          JSON.stringify({
            method: 'openSpecialShuffleCard',
            id: room._id,
            user: {
              userId: localStorage.getItem('userId'),
              nickname: localStorage.getItem('nickname'),
              card: card,
            },
          })
        );
        break;
    }
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

  const addRoomStore = async (res) => {
    dispatch(addRoomAction(res));
  };

  const addUserStore = async (res) => {
    dispatch(addUserAction(res));
  };

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

  return {
    user,
    room,
    currentPlayer,
    setCurrentPlayer,
    openCard,
    openSpecialCard,
    exitGame,
    isOpenModal,
    openModal,
    closeModal,
    selectedPlayer,
    setSelectedPlayer,
  };
};
