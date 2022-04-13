import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { makeStyles } from '@mui/styles';
import CustomButton from '../Button/Button';

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

const Modal = ({ isOpenModal, handleClose, exitGame }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpenModal}
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
        Are you sure you want to exit this game?
      </DialogTitle>
      <div className={classes.buttonsBlock}>
        <CustomButton
          width={140}
          onClick={handleClose}
          textButton={'Yes'}
          onClickHandler={() => exitGame()}
        />
        <CustomButton
          width={140}
          onClick={handleClose}
          textButton={'No'}
          onClickHandler={handleClose}
        />
      </div>
    </Dialog>
  );
};

export default Modal;
