import { useAppDispatch } from '@hooks';

import { authThunk } from '@store';

import { User } from '@common-types';

const useSignUpPageModel = () => {
  const dispatch = useAppDispatch();

  const onHandleSubmit = (values: User, navigate: any) => {
    dispatch(authThunk.signUp(values, navigate));
  };

  return {
    onHandleSubmit
  };
};

export { useSignUpPageModel };
