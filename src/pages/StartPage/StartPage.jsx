import { makeStyles } from '@mui/styles';

import CustomButton from '../../components/Button/Button';
import CustomLink from '../../components/Link/Link';
import { CREATE_ROOM_PAGE } from '../../utils/constants';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '18px',
  },
  title: {
    fontSize: '3rem',
  },
}));

const StartPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.title}>S.H.E.L.T.E.R.</div>
      <CustomLink to={CREATE_ROOM_PAGE}>
        <CustomButton textButton='Create Room!' />
      </CustomLink>
    </div>
  );
};

export default StartPage;
