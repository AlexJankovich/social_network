import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import {AppReducer} from './App-reducer';
import {AuthReducer} from './authReducer';
import {dialogsReducer} from './dialogs-reducer';
import {messageReducer} from './message-reducer';
import {postReducer} from './postData-reducer';
import {UsersReducer} from './users-reduser';

const reducers = combineReducers({
  postData: postReducer,
  messageData: messageReducer,
  dialogsData: dialogsReducer,
  usersData: UsersReducer,
  auth: AuthReducer,
  form: formReducer,
  App: AppReducer
});

export type AppStateType = ReturnType<typeof reducers>

const store = configureStore({
  reducer: reducers,
  // middleware:getDefaultMiddleware=>
  //   getDefaultMiddleware()
  //     .prepend(thunkMiddleware)
});


//@ts-ignore
window.store = store;

export default store;