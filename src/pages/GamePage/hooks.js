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
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [isOpenVotingModal, setIsOpenVotingModal] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [result, setResult] = useState(null);

  // ----------------- SNACKBAR -------------------------------------------

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  // ----------------- VOTING -------------------------------------------

  const openVotingModal = () => {
    setIsOpenVotingModal(true);
  };

  const closeVotingModal = () => {
    setIsOpenVotingModal(false);
    setTimeout(() => {
      setResult(null);
    }, 500);
  };

  const openVotingModalAll = () => {
    socket.send(
      JSON.stringify({
        method: 'openVotingModalAll',
        id: room._id,
      })
    );
  };

  const votePlayerHandler = (selectedUser, player) => {
    socket.send(
      JSON.stringify({
        method: 'votePlayer',
        id: room._id,
        selectedUser: selectedUser,
        player: player,
      })
    );
  };

  const getVotingResult = () => {
    socket.send(
      JSON.stringify({
        method: 'getVotingResult',
        id: room._id,
      })
    );
  };

  // ----------------- OPEN CARDS -------------------------------------------

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

  // ----------------- EXIT GAME -------------------------------------------

  const exitGame = () => {
    localStorage.clear();
    router.push('/');
    window.location.reload();
  };

  // ----------------- MODAL -------------------------------------------

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  // ----------------- DISPATCHES -------------------------------------------

  const addRoomStore = async (res) => {
    dispatch(addRoomAction(res));
  };

  const addUserStore = async (res) => {
    dispatch(addUserAction(res));
  };

  // ----------------- USE EFFECTS -------------------------------------------

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
        if (JSON.parse(event.data).method === 'openVotingModalAll') {
          openVotingModal();
        }

        if (JSON.parse(event.data).room?.users) {
          addRoomStore(JSON.parse(event.data).room);

          JSON.parse(event.data).room.users.map((user) => {
            if (user.nickname === localStorage.getItem('nickname')) {
              addUserStore(user);
            }
            return null;
          });

          if (JSON.parse(event.data).method === 'snackbar') {
            setSnackbarMessage(JSON.parse(event.data).snackbar);
            handleOpenSnackbar();
          }

          if (JSON.parse(event.data).method === 'getVotingResult') {
            setResult(JSON.parse(event.data).kickedOutPlayer);
          }

          if (JSON.parse(event.data).method === 'endGame') {
            setResult(JSON.parse(event.data).kickedOutPlayer);
          }
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
    isOpenSnackbar,
    handleCloseSnackbar,
    snackbarMessage,
    isOpenVotingModal,
    closeVotingModal,
    openVotingModalAll,
    votedPlayer,
    setVotedPlayer,
    votePlayerHandler,
    getVotingResult,
    result,
  };
};
