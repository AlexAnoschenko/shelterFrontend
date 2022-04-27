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
import VotingModal from './components/VotingModal/VotingModal';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
    padding: 10,
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: '#1111116c',
    padding: '4px 4px 8px 4px',
    borderRadius: '8px',
    width: '100%',
  },
  label: {
    fontSize: '28px',
    color: '#61be5e',
    textAlign: 'center',
  },
  labelSpecial: {
    fontSize: '24px',
    color: '#a6bd9a',
    textAlign: 'center',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  kickedOut: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
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
  } = useGamePage(props);

  return (
    <>
      {user?.isKickedOut && (
        <div className={classes.kickedOut}>You kicked out!</div>
      )}
      {!user?.isKickedOut && room?.isEndGame && (
        <div className={classes.kickedOut}>You win!</div>
      )}
      {!room?.isEndGame && !user?.isKickedOut && (
        <>
          <Modal
            isOpenModal={isOpenModal}
            handleClose={closeModal}
            exitGame={exitGame}
          />

          <VotingModal
            isOpen={isOpenVotingModal}
            handleClose={closeVotingModal}
            users={room?.users}
            votedPlayer={votedPlayer}
            setVotedPlayer={setVotedPlayer}
            votePlayerHandler={votePlayerHandler}
            getVotingResult={getVotingResult}
            result={result}
            player={user}
            isDraw={room?.isDraw}
            drawPlayers={room?.drawPlayers}
          />

          <div className={classes.main}>
            {user && room && room.shelter && room.apocalypse ? (
              <>
                <div className={classes.block}>
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
                </div>

                <div className={classes.block}>
                  <div className={classes.labelSpecial}>Special Conditions</div>
                  <div className={classes.cardsList}>
                    {room?.users.map((usr) => {
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
                </div>

                <div className={classes.block}>
                  <PlayerSwicher
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    room={room}
                  />
                </div>

                {user.role === 'admin' && (
                  <CustomButton
                    textButton='Voting'
                    width='100px'
                    height='40px'
                    fontSize='18px'
                    onClickHandler={openVotingModalAll}
                  />
                )}

                <div className={classes.block}>
                  <ShelterInfo room={room} />
                </div>

                <div className={classes.block}>
                  <ApocalypseInfo room={room} />
                </div>

                <CustomButton
                  textButton='Exit Game'
                  onClickHandler={openModal}
                  height='40px'
                  width='200px'
                />
              </>
            ) : (
              <UsersLoader />
            )}
          </div>

          <CustomizedSnackbars
            open={isOpenSnackbar}
            handleClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </>
      )}
    </>
  );
};

export default GamePage;
