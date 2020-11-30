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

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// const store = createStore(reducers, composeWithDevTools(
//     applyMiddleware(thunkMiddleware)))

const store = configureStore({
  reducer: reducers,
  middleware:getDefaultMiddleware=>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
});


// type ReturnedActionsTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type UsersActionType = ReturnType<ReturnedActionsTypes<typeof actions>>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

//@ts-ignore
window.store = store;

export default store;