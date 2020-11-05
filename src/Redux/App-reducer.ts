import {Action} from "redux";
import {authThunk} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const InitialState = {
    initialized: false
}

type initType = typeof InitialState


export const AppReducer = (state:initType = InitialState, action: AppActionType) => {
    switch (action.type) {
        case "SET-INITIALIZED": {
            return {
                ...state,
                initialized: action.initialized
            }
        }
        default:
            return state
    }
}

export const setInitializeSuccess = (initialized:boolean) => ({
        type: 'SET-INITIALIZED', initialized
    } as const)

type setInitializeType = ReturnType<typeof setInitializeSuccess>

type AppActionType = setInitializeType

export const InitializeApp = (): ThunkAction<void, AppStateType, unknown, Action<string>> => (dispatch) => {
    let promise = dispatch(authThunk())
    promise.then(()=>
        dispatch(setInitializeSuccess(true))
    )
}