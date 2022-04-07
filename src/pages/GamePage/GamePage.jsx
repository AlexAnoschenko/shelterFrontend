import { makeStyles } from '@mui/styles';
import ApocalypseInfo from './components/ApocalypseInfo/ApocalypseInfo';

import CardItem from './components/CardItem/CardItem';
import PlayerSwicher from './components/PlayerSwicher/PlayerSwicher';
import ShelterInfo from './components/ShelterInfo/ShelterInfo';
import { useGamePage } from './hooks';

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
}));

const GamePage = (props) => {
  const classes = useStyles();

  const { user, room, currentPlayer, setCurrentPlayer, openCard } =
    useGamePage(props);

  return (
    <div className={classes.main}>
      {user && room && (
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
          <PlayerSwicher
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            room={room}
          />
          <ShelterInfo room={room} />
          <ApocalypseInfo room={room} />
        </>
      )}
    </div>
  );
};

export default GamePage;
