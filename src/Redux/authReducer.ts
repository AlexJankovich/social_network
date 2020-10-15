import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Action, Dispatch} from "redux";
import {SignIn} from "../api/api";
import {stopSubmit} from "redux-form";
import {setInitializeSuccess} from "./App-reducer";

export type AuthResponseType = {
    id: number|null
    email: string
    login: string
}

export type UserAuthType = {
    data:AuthResponseType
    isFetching: boolean
    isAuth:boolean
}

const initialState: UserAuthType = {
    data:{
    id: null,
    email: '',
    login: '',
    },
    isFetching: false,
    isAuth:false
}

type AuthACType = {
    type: 'AUTH-USER'
    data: AuthResponseType
    isAuth:boolean
}
export type AuthIsFetchingACType = {
    type:'AUTH-IS-FETCHING'
    isFetching:boolean
}
type AuthActionType = AuthIsFetchingACType|AuthACType

export const AuthReducer = (state: UserAuthType = initialState, action: AuthActionType): UserAuthType => {
    switch (action.type) {
        case "AUTH-USER":{
            return {
                ...state,
                data:{...action.data},
                isAuth:action.isAuth
            }
        }
        case "AUTH-IS-FETCHING":{
            return {
                ...state,
                isFetching:action.isFetching
            }
        }
        default:
            return state
    }
}

export const AuthUser =(data:AuthResponseType, isAuth:boolean):AuthACType=>{
    return{type:"AUTH-USER", data, isAuth}
}
export const AuthIsFetching=(isFetching:boolean):AuthIsFetchingACType=>{
    return {type:"AUTH-IS-FETCHING", isFetching}
}

export const authThunk = () =>{
    return (dispatch:Dispatch) => {
        dispatch(AuthIsFetching(true))
        return SignIn.GetAuth()
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(AuthUser(response.data, true))
                }
                dispatch(AuthIsFetching(false))
            });
    }
}



export const AuthTC = (login:string, password:string, rememberMe:boolean):ThunkAction<void, AppStateType, unknown, Action<string>> =>{
    return (dispatch)=>{

        dispatch(AuthIsFetching(true))

        SignIn.Authorisation(login, password, rememberMe).then(res=>{
            if(res.resultCode===0){
                dispatch(authThunk())
                dispatch(AuthIsFetching(false))
            }else {
                dispatch(stopSubmit('login', {_error: res.messages[0]}))
                dispatch(AuthIsFetching(false))
            }
        })
    }
}

export const Logout = ():ThunkAction<void, AppStateType, unknown, Action<string>> =>{
    return (dispatch)=>{
        dispatch(AuthIsFetching(true))

        SignIn.Logout().then(res=>{
            if(res.resultCode===0){
                dispatch(AuthUser(res.data, false))
                // dispatch(setInitializeSuccess(false))
                dispatch(AuthIsFetching(false))
            }
        })
    }
}