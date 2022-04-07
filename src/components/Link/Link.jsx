import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const CustomLink = ({ children, to }) => {
  const classes = useStyles();

  return (
    <Link className={classes.link} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;
