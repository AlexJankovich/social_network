import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "./postData-reducer";
import {messageReducer} from "./message-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {actions, UsersReducer} from "./users-reduser";
import {AuthReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import {composeWithDevTools} from "redux-devtools-extension";
import {AppReducer} from "./App-reducer";

const reducers = combineReducers({
    postData:postReducer,
    messageData:messageReducer,
    dialogsData:dialogsReducer,
    usersData:UsersReducer,
    auth:AuthReducer,
    form:formReducer,
    App:AppReducer
});

// type reducersType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)))


// type ReturnedActionsTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type UsersActionType = ReturnType<ReturnedActionsTypes<typeof actions>>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

//@ts-ignore
window.store =store

export default store;