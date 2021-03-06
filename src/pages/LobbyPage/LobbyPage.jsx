import { makeStyles } from '@mui/styles';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { QRCodeSVG } from 'qrcode.react';

import CustomButton from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
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
    textAlign: 'center',
    color: '#a6bd9a',
  },
  subTitle: {
    fontSize: '1.6rem',
    color: '#a6bd9a',
  },
  qrWrapper: {
    border: '4px solid #e0d01c',
    animation: `$tgAnim 2000ms infinite`,
    borderRadius: '4px',
  },
  tgIcon: {
    border: '2px solid #e0d01c',
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
  titlePlayers: {
    fontSize: '1.6rem',
    marginBottom: '20px',
    textAlign: 'center',
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

  const {
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
  } = useLobbyPage(props);

  return (
    <>
      <Modal
        isOpenModal={isOpenModal}
        handleClose={closeModal}
        exitGame={exitGame}
      />
      <div className={classes.main}>
        <button onClick={clearLS}>Clear LS</button>

        {nickname && isUserExists ? (
          <>
            <div className={classes.title}>Use QR-code</div>

            <div className={classes.qrWrapper}>
              <QRCodeSVG
                size={190}
                bgColor='#329c6c'
                value={`${
                  window.location.origin
                }/lobbyPage/${getRoomIdFromLS()}/`}
              />
            </div>

            <div className={classes.subTitle}>Or share link!</div>
            <TelegramShareButton
              url={`${window.location.origin}/lobbyPage/${getRoomIdFromLS()}/`}
            >
              <TelegramIcon
                size={168}
                round={true}
                className={classes.tgIcon}
              />
            </TelegramShareButton>

            <div>
              <Loader />
            </div>

            {room ? (
              <div>
                <div
                  className={classes.titlePlayers}
                >{`${room.users.length} from ${room.numberOfPlayers} joined`}</div>
                <div className={classes.users}>
                  {room.users.map((user) => (
                    <div
                      style={{
                        color: `#${Math.floor(
                          Math.random() * 16777215
                        ).toString(16)}`,
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
            <CustomButton
              height='40px'
              width='200px'
              textButton='Exit Game'
              onClickHandler={openModal}
            />
          </>
        ) : (
          <NewUserPage updateStoreRoom={updateStoreRoom} />
        )}
      </div>
    </>
  );
};

export default LobbyPage;
