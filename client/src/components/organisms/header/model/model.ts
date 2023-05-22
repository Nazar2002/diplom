import { useState } from 'react';

import { useAppDispatch, useAppSelector, useWindowWidth } from '@hooks';

import { authThunk } from '@store';

const useHeaderModel = () => {
  const [visible, setVisible] = useState(false);

  const width = useWindowWidth();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authStore);

  const onLogoutClick = () => dispatch(authThunk.signOut());

  const onOpenClick = () => setVisible(!visible);

  return {
    width,

    visible,

    user,

    onLogoutClick,

    onOpenClick
  };
};

export { useHeaderModel };
