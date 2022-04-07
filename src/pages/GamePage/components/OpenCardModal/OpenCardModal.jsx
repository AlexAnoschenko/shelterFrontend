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
    marginBottom: '25px',
    textTransform: 'uppercase',
    fontSize: '22px',
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
}) => {
  const classes = useStyles();

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
        <div className={classes.cardTypeText}>{card.type}</div>
      )}
      <div className={classes.buttonsBlock}>
        <Button
          width={140}
          onClick={handleClose}
          textButton={'Yes'}
          onClickHandler={() => openCardHandle(card)}
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
