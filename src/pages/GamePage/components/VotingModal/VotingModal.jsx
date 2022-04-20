import Dialog from '@mui/material/Dialog';

import { makeStyles } from '@mui/styles';
import CustomButton from '../../../../components/Button/Button';

const useStyles = makeStyles(() => ({
  title: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '18px',
  },
  titleAfterVoting: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '24px',
  },
  timer: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '18px',
  },
  playerBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '18px',
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
  buttonBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const VotingModal = ({
  isOpen,
  timer,
  handleClose,
  users,
  votedPlayer,
  setVotedPlayer,
  votePlayer,
  isVoted,
  result,
  player,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        style: {
          backgroundColor: '#252525',
          borderRadius: '10px',
          width: '100%',
          padding: '10px',
        },
      }}
    >
      <div id='alert-dialog-title' className={classes.title}>
        Voting
      </div>
      {!result && <div className={classes.timer}>{timer}</div>}
      {isVoted || result ? (
        <div className={classes.titleAfterVoting}>
          {!result ? (
            <div>You voted! Waiting for results</div>
          ) : (
            <div className={classes.resultBlock}>
              <div>{`${result} kicked out!`}</div>
              <div className={classes.buttonBlock}>
                <CustomButton textButton='Close' onClickHandler={handleClose} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={classes.title}>Vote for the player</div>
          <div className={classes.playerBlock}>
            {users?.map((user) => {
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
          </div>
          <div className={classes.buttonBlock}>
            <CustomButton
              textButton='VOTE'
              onClickHandler={() => votePlayer(votedPlayer)}
            />
          </div>
        </>
      )}
    </Dialog>
  );
};

export default VotingModal;
