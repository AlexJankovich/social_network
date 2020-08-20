import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "./postData-reducer";
import {messageReducer} from "./message-reducer";
import {dialogsReducer} from "./dialogs-reducer";

let reducers = combineReducers({
    postData:postReducer,
    messageData:messageReducer,
    dialogsData:dialogsReducer
});

type reducersType = typeof reducers;
export type AppStateType = ReturnType<reducersType>

let store = createStore(reducers, applyMiddleware());

export default store;