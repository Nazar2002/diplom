import { authSlice } from './auth';

describe('authSlice', () => {
  it('should set load to true', () => {
    const initialState = { load: false, user: null };

    const action = { type: authSlice.actions.setLoad.type, payload: true };

    const nextState = authSlice.reducer(initialState, action);

    expect(nextState.load).toBe(true);
  });

  it('should set the user', () => {
    const initialState = { load: false, user: null };

    const user = {
      id: 1,

      email: 'nazar@example.com',

      password: 'QWERTY',

      firstName: 'Nazar',

      lastName: 'Havuchak',

      role: 'USER'
    };

    const action = { type: authSlice.actions.setUser.type, payload: user };

    const nextState = authSlice.reducer(initialState, action);

    expect(nextState.user).toEqual(user);
  });

  it('should reset the user', () => {
    const initialState = {
      load: false,

      user: {
        id: 1,

        email: 'nazar@example.com',

        password: 'QWERTY',

        firstName: 'Nazar',

        lastName: 'Havuchak',

        role: 'USER'
      }
    };

    const action = { type: authSlice.actions.resetUser.type };

    const nextState = authSlice.reducer(initialState, action);

    expect(nextState.user).toBeNull();
  });
});
