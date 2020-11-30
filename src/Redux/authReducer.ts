import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Action, Dispatch} from 'redux';
import {stopSubmit} from 'redux-form';
import {ThunkAction} from 'redux-thunk';
import {SignIn} from '../api/api';
import {AppStateType} from './redux-store';

export type AuthResponseType = {
  id: number
  email: string
  login: string
}

const initialState = {
  data: {
    id: 0,
    email: '',
    login: '',
  },
  isFetching: false,
  isAuth: false,
  CaptchaURL: ''
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    AuthUser(state, action: PayloadAction<{ data: AuthResponseType, isAuth: boolean }>) {
      state.data = action.payload.data;
      state.isAuth = action.payload.isAuth;
    },
    AuthIsFetching(state, action: PayloadAction<{ isFetching: boolean }>) {
      state.isFetching = action.payload.isFetching;
    },
    SetCaptchaURL(state, action: PayloadAction<{ CaptchaURL: string }>) {
      state.CaptchaURL = action.payload.CaptchaURL;
    }
  }
});

export const authThunk = () => {
  return (dispatch: Dispatch) => {
    dispatch(AuthIsFetching({isFetching: true}));
    return SignIn.GetAuth()
      .then(response => {
        if (response.resultCode === 0) {
          dispatch(AuthUser({data: response.data, isAuth: true}));
        }
        dispatch(AuthIsFetching({isFetching: false}));
      });
  };
};

// export const GetCaptcha = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(AuthIsFetching({isFetching: true}));
//     SignIn.GetCaptcha().then(res => {
//       dispatch(SetCaptchaURL({CaptchaURL: res.url}));
//     });
//   };
// };

export const AuthTC = (login: string, password: string, rememberMe: boolean, captcha?: string): ThunkAction<void, AppStateType, unknown, Action<string>> => {
  return (dispatch) => {

    dispatch(AuthIsFetching({isFetching: true}));

    SignIn.Authorisation(login, password, rememberMe, captcha).then(res => {
      if (res.resultCode === 0) {
        dispatch(authThunk());
        dispatch(AuthIsFetching({isFetching: false}));

      } else if (res.resultCode === 10) {
        SignIn.GetCaptcha().then(res => {
          debugger
          dispatch(SetCaptchaURL({CaptchaURL:res.url}));
          dispatch(AuthIsFetching({isFetching: false}));

        });
      } else {
        dispatch(stopSubmit('login', {_error: res.messages[0]}));
        dispatch(AuthIsFetching({isFetching: false}));

      }
    });
  };
};

export const Logout = (): ThunkAction<void, AppStateType, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(AuthIsFetching({isFetching: true}));

    SignIn.Logout().then(res => {
      if (res.resultCode === 0) {
        dispatch(AuthUser({data:res.data, isAuth:false}));
        // dispatch(setInitializeSuccess(false))
        dispatch(AuthIsFetching({isFetching: false}));
      }
    });
  };
};

export const AuthReducer =slice.reducer;
export const {AuthUser, AuthIsFetching, SetCaptchaURL} = slice.actions;