import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "./postData-reducer";
import {messageReducer} from "./message-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {UsersReducer} from "./users-reduser";
import {AuthReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    postData:postReducer,
    messageData:messageReducer,
    dialogsData:dialogsReducer,
    usersData:UsersReducer,
    auth:AuthReducer,
    form:formReducer
});

// type reducersType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)))

//@ts-ignore
window.store =store

export default store;