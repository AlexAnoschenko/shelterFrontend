import Dialog from '@mui/material/Dialog';

import { makeStyles } from '@mui/styles';
import CustomButton from '../../../../components/Button/Button';
import Loader from '../../../../components/Loader/Loader';

const useStyles = makeStyles(() => ({
  title: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '18px',
  },
  titleDraw: {
    color: '#a6bd9a',
    textAlign: 'center',
    fontSize: '30px',
    marginBottom: '18px',
  },
  titleAfterVoting: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '24px',
  },
  loaderWrapper: {
    textAlign: 'center',
  },
  playerBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  player: {
    fontSize: '18px',
    border: '2px solid black',
    padding: '10px',
    borderRadius: '10px',
    width: '90px',
    textAlign: 'center',
    color: '#faebd7',
  },
  resultBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  waitingResult: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '24px',
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '18px',
  },
}));

const VotingModal = ({
  isOpen,
  handleClose,
  users,
  votedPlayer,
  setVotedPlayer,
  votePlayerHandler,
  getVotingResult,
  result,
  player,
  drawPlayers,
  isDraw,
}) => {
  const classes = useStyles();

  const avaliablePlayersCounter = () => {
    const avaliablePlayers = [];
    users?.forEach((user) => {
      if (!user.isKickedOut) {
        avaliablePlayers.push(user);
      }
    });
    return avaliablePlayers.length;
  };

  const votedPlayersCounter = () => {
    const votedPlayers = [];
    users?.map((user) => {
      if (user.isVoted) {
        votedPlayers.push(user);
      }
    });
    return votedPlayers.length;
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        style: {
          background: 'rgb(22, 22, 28)',
          borderRadius: '10px',
          width: '100%',
          padding: '10px',
        },
      }}
    >
      <div id='alert-dialog-title' className={classes.title}>
        Voting...
      </div>
      {player?.isVoted ? (
        <div>
          {!result && (
            <>
              <div className={classes.titleAfterVoting}>
                You voted! Waiting for results
              </div>

              <div className={classes.loaderWrapper}>
                <Loader />
              </div>

              <div className={classes.waitingResult}>
                {`${votedPlayersCounter()} from ${avaliablePlayersCounter()} voted`}
              </div>
              {player?.role === 'admin' && (
                <div className={classes.buttonBlock}>
                  <CustomButton
                    height='40px'
                    width='200px'
                    textButton='Show result'
                    onClickHandler={() => getVotingResult()}
                    disabled={
                      votedPlayersCounter() !== avaliablePlayersCounter()
                    }
                  />
                </div>
              )}
            </>
          )}

          {result && (
            <div className={classes.resultBlock}>
              <div
                className={classes.titleAfterVoting}
              >{`${result} kicked out!`}</div>
              <div className={classes.buttonBlock}>
                <CustomButton textButton='Close' onClickHandler={handleClose} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {isDraw ? <div className={classes.titleDraw}>DRAW!</div> : null}

          <div className={classes.title}>Vote for the player</div>

          <div className={classes.playerBlock}>
            {isDraw ? (
              <>
                {drawPlayers?.map((user) => {
                  if (!user.isKickedOut && user.nickname !== player?.nickname)
                    return (
                      <div
                        key={user.userId}
                        className={classes.player}
                        style={{
                          backgroundColor:
                            user.nickname === votedPlayer?.nickname
                              ? '#019601'
                              : '#686868',
                        }}
                        onClick={() => setVotedPlayer(user)}
                      >
                        {user.nickname}
                      </div>
                    );

                  return null;
                })}
              </>
            ) : (
              <>
                {users?.map((user) => {
                  if (!user.isKickedOut && user.nickname !== player?.nickname)
                    return (
                      <div
                        key={user.userId}
                        className={classes.player}
                        style={{
                          backgroundColor:
                            user.nickname === votedPlayer?.nickname
                              ? '#329c6c'
                              : '#686868',
                        }}
                        onClick={() => setVotedPlayer(user)}
                      >
                        {user.nickname}
                      </div>
                    );

                  return null;
                })}
              </>
            )}
          </div>
          <div className={classes.buttonBlock}>
            <CustomButton
              height='40px'
              width='150px'
              textButton='Vote!'
              onClickHandler={() => votePlayerHandler(votedPlayer, player)}
              disabled={!votedPlayer}
            />
          </div>
        </>
      )}
    </Dialog>
  );
};

export default VotingModal;
