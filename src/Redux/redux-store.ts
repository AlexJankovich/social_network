import {combineReducers, createStore} from "redux";
import {postReducer} from "./postData-reducer";
import {messageReducer} from "./message-reducer";
import {dialogsReducer} from "./dialogs-reducer";

let reducers = combineReducers({
    postData:postReducer,
    messageData:messageReducer,
    dialogsData:dialogsReducer
});

let store = createStore(reducers);

export default store;