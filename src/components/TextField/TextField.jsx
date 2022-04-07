import { TextField } from '@mui/material';

const useStyles = () => ({
  root: {
    background: 'antiquewhite',
    borderRadius: '4px 4px 0 0',
    width: '280px',

    '& .MuiInputLabel-root': {
      fontSize: '20px',

      '&.Mui-focused': {
        color: '#575757',
      },
    },

    '& .MuiFilledInput-input': {
      fontSize: '20px',
    },

    '& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after': {
      borderBottom: '2px solid #eee60f',
    },
  },
});

const CustomTextField = ({
  label = 'Text',
  id,
  name,
  value,
  onChange,
  error,
  type,
}) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        sx={classes.root}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        label={label}
        variant='filled'
        type={type}
      />
    </div>
  );
};

export default CustomTextField;
