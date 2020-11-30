import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Action} from "redux";
import {authThunk} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const InitialState = {
    initialized: false
}

const slice = createSlice({
    name:'App',
    initialState: InitialState,
    reducers:{
        setInitializeSuccess(state, action:PayloadAction<{ initialized: boolean }>){
            state.initialized = action.payload.initialized
        }
    }
})

export const InitializeApp = (): ThunkAction<void, AppStateType, unknown, Action<string>> => (dispatch) => {
    let promise = dispatch(authThunk())
    promise.then(()=>
        dispatch(setInitializeSuccess({initialized:true}))
    )
}

export const AppReducer = slice.reducer
export const {setInitializeSuccess} = slice.actions