import Button from '@mui/material/Button';

const useStyles = ({ width, height }) => ({
  root: {
    width: width,
    height: height,
    fontSize: '1.5rem !important',
    textTransform: 'none !important',
    backgroundColor: '#5f5f5f !important',
    color: 'antiquewhite !important',

    '&:active': {
      backgroundColor: '#1b1b1b !important',
    },
  },
});

const CustomButton = ({
  textButton,
  width = 280,
  height = 55,
  type = 'button',
  onClickHandler,
}) => {
  const classes = useStyles({ width, height });

  return (
    <Button
      sx={classes.root}
      variant='contained'
      type={type}
      onClick={onClickHandler}
    >
      {textButton}
    </Button>
  );
};

export default CustomButton;
