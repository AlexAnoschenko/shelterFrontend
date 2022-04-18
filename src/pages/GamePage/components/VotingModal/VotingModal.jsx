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
      <div className={classes.timer}>{timer}</div>
      {isVoted ? (
        <div className={classes.titleAfterVoting}>
          You voted! Waiting for results
        </div>
      ) : (
        <>
          <div className={classes.title}>Vote for the player</div>
          <div className={classes.playerBlock}>
            {users?.map((user) => {
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
