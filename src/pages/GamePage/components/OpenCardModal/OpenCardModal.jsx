import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../../../../components/Button/Button';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  title: {
    color: '#faebd7',
    textAlign: 'center',
  },
  cardTypeText: {
    color: '#f7ba6c',
    textAlign: 'center',
    marginBottom: '18px',
    textTransform: 'uppercase',
    fontSize: '22px',
  },
  subTitle: {
    color: '#faebd7',
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '18px',
  },
  playersBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: '18px',
  },
  player: {
    width: '120px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    color: '#faebd7',
    fontSize: '18px',
  },
  buttonsBlock: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginBottom: '18px',
  },
}));

const OpenCardModal = ({
  isOpenCardModal,
  handleClose,
  card,
  openCard,
  type = 'default',
  selectedPlayer,
  setSelectedPlayer,
  users,
}) => {
  const classes = useStyles();
  const nickname = localStorage.getItem('nickname');

  const openCardHandle = (card) => {
    openCard(card);
    handleClose();
  };

  return (
    <Dialog
      open={isOpenCardModal}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        style: {
          backgroundColor: '#252525',
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle id='alert-dialog-title' className={classes.title}>
        Are you sure you want to open this card?
      </DialogTitle>
      {card && (
        <div className={classes.cardTypeText}>
          {card.type !== 'specialConditions'
            ? card.type.toUpperCase()
            : 'SPECIAL CONDITIONS'}
        </div>
      )}
      {(type === 'exchange' || type === 'opening') && (
        <div>
          <div className={classes.subTitle}>Choose a player</div>
          <div className={classes.playersBlock}>
            {users?.map((user) => {
              if (user.nickname !== nickname) {
                return (
                  <div
                    className={classes.player}
                    key={user.userId}
                    style={{
                      backgroundColor:
                        user.nickname === selectedPlayer
                          ? '#019601'
                          : '#686868',
                    }}
                    onClick={() => setSelectedPlayer(user.nickname)}
                  >
                    {user.nickname}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
      <div className={classes.buttonsBlock}>
        <Button
          width={140}
          onClick={handleClose}
          textButton={'Yes'}
          onClickHandler={() => openCardHandle(card)}
          disabled={
            (card.action === 'exchange' || card.action === 'opening') &&
            !selectedPlayer
          }
        />
        <Button
          width={140}
          onClick={handleClose}
          textButton={'No'}
          onClickHandler={handleClose}
        />
      </div>
    </Dialog>
  );
};

export default OpenCardModal;
