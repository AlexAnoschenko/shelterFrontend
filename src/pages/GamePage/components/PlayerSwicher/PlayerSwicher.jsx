import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '28px',
    marginBottom: '18px',
  },
  playerList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  playerItem: {
    width: '90px',
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
    border: '2px solid black',
    borderRadius: '10px',
  },
}));

const PlayerSwicher = ({ currentPlayer, setCurrentPlayer, room }) => {
  const classes = useStyles();

  const swichPlayer = (player) => {
    if (currentPlayer !== player) {
      setCurrentPlayer(player);
    }
    return;
  };

  return (
    <div className={classes.main}>
      <div className={classes.label}>Players</div>
      <div className={classes.playerList}>
        {room.users.map((user) => (
          <div
            key={user.userId}
            className={classes.playerItem}
            style={{
              backgroundColor: user.isKickedOut
                ? '#1a1919'
                : user.nickname === currentPlayer
                ? '#019601'
                : '#3b3b3b',
              pointerEvents: user.isKickedOut ? 'none' : 'auto',
              color: user.isKickedOut ? '#757575' : '#faebd7',
            }}
            onClick={() => swichPlayer(user.nickname)}
          >
            {`${user.nickname} ${user.isKickedOut ? '(Kicked)' : ''}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSwicher;
