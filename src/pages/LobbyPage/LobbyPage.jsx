import { makeStyles } from '@mui/styles';
import { TelegramShareButton, TelegramIcon } from 'react-share';

import Loader from '../../components/Loader/Loader';
import UsersLoader from '../../components/UsersLoader/UsersLoader';
import NewUserPage from '../NewUserPage/NewUserPage';
import { useLobbyPage } from './hooks';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  title: {
    fontSize: '1.6rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '1.6rem',
    color: '#c4ee0b',
  },
  tgIcon: {
    border: '2px solid white',
    borderColor: '#e0d01c',
    borderRadius: '50%',
    animation: `$tgAnim 2000ms infinite`,
  },
  '@keyframes tgAnim': {
    '0%': {
      boederColor: '#e0d01c',
    },
    '50%': {
      borderColor: '#8910ec',
    },
    '100%': {
      borderColor: '#e0d01c',
    },
  },
  users: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    color: '#c4ee0b',
    textShadow:
      '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    fontSize: '20px',
  },
}));

const LobbyPage = (props) => {
  const classes = useStyles();
  const { room, nickname, updateStoreRoom, getRoomIdFromLS, clearLS } =
    useLobbyPage(props);

  return (
    <div className={classes.main}>
      <button onClick={clearLS}>Clear LS</button>

      {nickname ? (
        <>
          <div className={classes.title}>Share Link</div>
          <div className={classes.subTitle}>Click!</div>
          <TelegramShareButton
            url={`http://localhost:3000/lobbyPage/${getRoomIdFromLS()}`}
          >
            <TelegramIcon size={256} round={true} className={classes.tgIcon} />
          </TelegramShareButton>
          <Loader />
          {room ? (
            <div>
              <div
                className={classes.title}
              >{`${room.users.length} from ${room.numberOfPlayers} joined`}</div>
              <div className={classes.users}>
                {room.users.map((user) => (
                  <div
                    style={{
                      color: `#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`,
                    }}
                    key={user.userId}
                  >
                    {user.nickname}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <UsersLoader />
          )}
        </>
      ) : (
        <NewUserPage updateStoreRoom={updateStoreRoom} />
      )}
    </div>
  );
};

export default LobbyPage;
