import { combineReducers, createStore} from "redux";
import {postReducer} from "./postData-reducer";
import {messageReducer} from "./message-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {UsersReducer} from "./users-reduser";

const reducers = combineReducers({
    postData:postReducer,
    messageData:messageReducer,
    dialogsData:dialogsReducer,
    usersData:UsersReducer
});

// type reducersType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>

const store = createStore(reducers);

//@ts-ignore
window.store =store

export default store;