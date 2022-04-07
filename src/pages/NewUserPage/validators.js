import * as Yup from 'yup';

export const CreateUserSchema = Yup.object().shape({
  nickname: Yup.string().required(),
});
