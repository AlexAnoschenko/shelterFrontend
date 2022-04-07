import { useState } from 'react';
import { makeStyles } from '@mui/styles';

import OpenCardModal from '../OpenCardModal/OpenCardModal';

const useStyles = makeStyles(() => ({
  main: {
    width: '90px',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 18,
    backgroundColor: (props) =>
      props.isVisible ? '#016b2a' : '#3b3b3b',
    padding: '10px',
    border: '2px solid black',
    borderRadius: '10px',
    pointerEvents: (props) =>
      props.currentPlayer !== localStorage.getItem('nickname') ||
      props.isVisible
        ? 'none'
        : 'auto',
  },
}));

const CardItem = ({ card, currentPlayer, openCard }) => {
  const classes = useStyles({
    isVisible: card.isVisible,
    currentPlayer,
  });
  const [isOpenCardModal, setIsOpenCardModal] = useState(false);

  const handleClickOpen = () => {
    setIsOpenCardModal(true);
  };

  const handleClose = () => {
    setIsOpenCardModal(false);
  };

  return (
    <>
      <OpenCardModal
        isOpenCardModal={isOpenCardModal}
        handleClose={handleClose}
        card={card}
        openCard={openCard}
      />

      <div className={classes.main} onClick={handleClickOpen}>
        <div>{card.type.toUpperCase()}</div>
        <div>
          {currentPlayer === localStorage.getItem('nickname') ||
          card.isVisible
            ? card.description
            : '???'}
        </div>
      </div>
    </>
  );
};

export default CardItem;
