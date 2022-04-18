import { makeStyles } from '@mui/styles';

import CustomButton from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ApocalypseInfo from './components/ApocalypseInfo/ApocalypseInfo';
import CardItem from './components/CardItem/CardItem';
import PlayerSwicher from './components/PlayerSwicher/PlayerSwicher';
import ShelterInfo from './components/ShelterInfo/ShelterInfo';
import UsersLoader from '../../components/UsersLoader/UsersLoader';
import { useGamePage } from './hooks';
import CustomizedSnackbars from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
    padding: 10,
  },
  label: {
    fontSize: '28px',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  exitButton: {
    marginBottom: '10px',
  },
}));

const GamePage = (props) => {
  const classes = useStyles();

  const {
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
    openSnackbar,
    handleCloseSnackbar,
    snackbarMessage,
  } = useGamePage(props);

  return (
    <>
      <Modal
        isOpenModal={isOpenModal}
        handleClose={closeModal}
        exitGame={exitGame}
      />
      <div className={classes.main}>
        {user && room && room.shelter && room.apocalypse ? (
          <>
            <div className={classes.label}>{currentPlayer}</div>
            <div className={classes.cardsList}>
              {room.users.map((usr) => {
                if (usr.nickname === currentPlayer) {
                  return usr.cards.map((card) => {
                    return (
                      <CardItem
                        key={card.id}
                        card={card}
                        currentPlayer={currentPlayer}
                        openCard={openCard}
                      />
                    );
                  });
                }
                return null;
              })}
            </div>
            <div className={classes.label}>Special Conditions</div>
            <div className={classes.cardsList}>
              {room.users.map((usr) => {
                if (usr.nickname === currentPlayer) {
                  return usr.specialConditionCards.map((card) => {
                    return (
                      <CardItem
                        key={card.id}
                        card={card}
                        currentPlayer={currentPlayer}
                        openCard={openSpecialCard}
                        type={card.action}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelectedPlayer}
                        users={room.users}
                      />
                    );
                  });
                }
                return null;
              })}
            </div>
            <PlayerSwicher
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              room={room}
            />
            <ShelterInfo room={room} />
            <ApocalypseInfo room={room} />
            <CustomButton
              className={classes.exitButton}
              textButton='Exit Game'
              onClickHandler={openModal}
            />
          </>
        ) : (
          <UsersLoader />
        )}
      </div>

      <CustomizedSnackbars
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default GamePage;
