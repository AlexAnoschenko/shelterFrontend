import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getRoom, voteUser } from '../../api/room';
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
  const [timer, setTimer] = useState(20);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [isVoted, setIsVoted] = useState(false);

  const startTimer = () => {
    setIsActiveTimer(true);
  };

  const resetTimer = () => {
    setTimer(10);
    setIsActiveTimer(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const votePlayer = async (user) => {
    const res = await voteUser(user);
    if (res.data.isVoted) {
      setIsVoted(true);
    }
  };

  const openVotingModalAll = () => {
    socket.send(
      JSON.stringify({
        method: 'openVotingModalAll',
        id: room._id,
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

  const openVotingModal = () => {
    startTimer();
    setIsOpenVotingModal(true);
  };

  const closeVotingModal = () => {
    setIsOpenVotingModal(false);
  };

  const addRoomStore = async (res) => {
    dispatch(addRoomAction(res));
  };

  const addUserStore = async (res) => {
    dispatch(addUserAction(res));
  };

  useEffect(() => {
    let interval = null;
    if (isActiveTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActiveTimer, timer]);

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
        if (JSON.parse(event.data).method === 'openVotingModalAll') {
          openVotingModal();
        }

        if (JSON.parse(event.data).room?.users) {
          addRoomStore(JSON.parse(event.data).room);
          if (JSON.parse(event.data).method === 'snackbar') {
            setSnackbarMessage(JSON.parse(event.data).snackbar);
            handleOpenSnackbar();
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
    timer,
    openVotingModalAll,
    votedPlayer,
    setVotedPlayer,
    votePlayer,
    isVoted,
  };
};
