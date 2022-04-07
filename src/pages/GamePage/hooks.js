import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRoom } from '../../api/room';
import { addRoomAction, addUserAction } from '../../store/actions/roomActions';

export const useGamePage = (props) => {
  const dispatch = useDispatch();
  const { user, room, socket } = useSelector((state) => state.room);
  const [currentPlayer, setCurrentPlayer] = useState(
    localStorage.getItem('nickname')
  );

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
    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          method: 'connection',
          nickname: localStorage.getItem('nickname'),
          id: localStorage.getItem('roomId'),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.readyState]);

  useEffect(() => {
    socket.onmessage = (event) => {
      if (JSON.parse(event.data).users) {
        addRoomStore(JSON.parse(event.data));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return {
    user,
    room,
    currentPlayer,
    setCurrentPlayer,
    openCard,
  };
};
