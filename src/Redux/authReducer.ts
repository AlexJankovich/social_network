import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Action, Dispatch} from "redux";
import {SignIn} from "../api/api";

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
                isAuth:true
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

export const AuthUser =(data:AuthResponseType):AuthACType=>{
    return{type:"AUTH-USER", data}
}
export const AuthIsFetching=(isFetching:boolean):AuthIsFetchingACType=>{
    return {type:"AUTH-IS-FETCHING", isFetching}
}

export const authThunk = ():ThunkAction<void, AppStateType, unknown, Action<string>> =>{
    return (dispatch) => {
        dispatch(AuthIsFetching(true))
        SignIn.GetAuth()
            .then(response => {
                debugger
                if (response.resultCode === 0) {
                    dispatch(AuthUser(response.data))
                }
                dispatch(AuthIsFetching(false))
            });
    }
}

export const AuthTC = (login:string, password:string, rememberMe:boolean):ThunkAction<void, AppStateType, unknown, Action<string>> =>{
    return (dispatch)=>{
        // dispatch(AuthIsFetching(true))
        debugger
        SignIn.Authorisation(login, password, rememberMe).then(res=>{
            debugger
            if(res.resultCode===0){
                dispatch(authThunk())
            }
        })
    }
}