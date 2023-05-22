import { useAppDispatch } from '@hooks';

import { authThunk } from '@store';

import { User } from '@common-types';

const useSignInPageModel = () => {
  const dispatch = useAppDispatch();

  const initState = {
    email: '',
    password: ''
  };

  const onHandleSubmit = (values: User, navigate: any) => {
    dispatch(authThunk.signIn(values, navigate));
  };

  return {
    initState,

    onHandleSubmit
  };
};

export { useSignInPageModel };
