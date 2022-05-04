import Button from '@mui/material/Button';

const useStyles = ({ width, height, fontSize, disabled }) => ({
  root: {
    width: width,
    height: height,
    fontSize: fontSize,
    textTransform: 'none !important',
    backgroundColor: disabled ? '#2e2e2e !important' : '#329c6c !important',
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
  disabled = false,
  fontSize = '1.5rem !important',
}) => {
  const classes = useStyles({ width, height, fontSize, disabled });

  return (
    <Button
      sx={classes.root}
      variant='contained'
      type={type}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {textButton}
    </Button>
  );
};

export default CustomButton;
