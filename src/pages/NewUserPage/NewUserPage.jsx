import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/Button/Button';
import CustomTextField from '../../components/TextField/TextField';
import { CreateUserSchema } from './validators';
import { createUser } from '../../api/room';
import { addUserAction } from '../../store/actions/roomActions';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '18px',
  },
  error: {
    fontSize: '20px',
    color: 'red',
    textAlign: 'center',
  },
}));

const NewUserPage = ({ updateStoreRoom }) => {
  const classes = useStyles();
  const { socket } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const { id } = useParams();

  const addUserStore = async (res) => {
    dispatch(addUserAction(res));
  };

  const connectNewUserSocket = (id, res) => {
    socket.send(
      JSON.stringify({
        method: 'connection',
        id: id,
        role: 'player',
        nickname: res.data.user.nickname,
        cards: [],
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      nickname: '',
    },
    onSubmit: async (values) => {
      const res = await createUser({
        nickname: values.nickname,
        id,
      });
      addUserStore(res.data.user);
      connectNewUserSocket(id, res);
      updateStoreRoom();
    },
    validationSchema: CreateUserSchema,
  });

  return (
    <form className={classes.main} onSubmit={formik.handleSubmit}>
      {formik.errors.nickname ? (
        <div className={classes.error}>Required fields!</div>
      ) : null}

      <CustomTextField
        id='nickname'
        name='nickname'
        value={formik.values.nickname}
        onChange={formik.handleChange}
        error={
          formik.touched.nickname && Boolean(formik.errors.nickname)
        }
        label='Enter your Nickname...'
      />

      <CustomButton type='submit' textButton='Ready!' height='62px' />
    </form>
  );
};

export default NewUserPage;
