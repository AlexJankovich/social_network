import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Action, Dispatch} from "redux";
import {SignIn} from "../api/api";
import {stopSubmit} from "redux-form";

export type AuthResponseType = {
    id: number
    email: string
    login: string
}

export type UserAuthType = {
    data: AuthResponseType
    isFetching: boolean
    isAuth: boolean
    CaptchaURL: string
}

const initialState: UserAuthType = {
    data: {
        id: 0,
        email: '',
        login: '',
    },
    isFetching: false,
    isAuth: false,
    CaptchaURL: ''
}

type AuthACType = {
    type: 'AUTH-USER'
    data: AuthResponseType
    isAuth: boolean
}
export type AuthIsFetchingACType = {
    type: 'AUTH-IS-FETCHING'
    isFetching: boolean
}
type AuthActionType = AuthIsFetchingACType | AuthACType | SetCaptchaUrlType

export const AuthReducer = (state: UserAuthType = initialState, action: AuthActionType): UserAuthType => {
    switch (action.type) {
        case "AUTH-USER": {
            return {
                ...state,
                data: {...action.data},
                isAuth: action.isAuth
            }
        }
        case "AUTH-IS-FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "AUTH/SET-CAPTCHA-URL": {
            return {
                ...state,
                CaptchaURL: action.CaptchaURL
            }
        }
        default:
            return state
    }
}

export const AuthUser = (data: AuthResponseType, isAuth: boolean): AuthACType => {
    return {type: "AUTH-USER", data, isAuth}
}

export const AuthIsFetching = (isFetching: boolean): AuthIsFetchingACType => {
    return {type: "AUTH-IS-FETCHING", isFetching}
}

export const SetCaptchaURL = (CaptchaURL: string) => {
    return {type: "AUTH/SET-CAPTCHA-URL", CaptchaURL} as const
}

type SetCaptchaUrlType = ReturnType<typeof SetCaptchaURL>

export const authThunk = () => {
    return (dispatch: Dispatch) => {
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

export const GetCaptcha = () => {
    return (dispatch: Dispatch) => {
        dispatch(AuthIsFetching(true))
        SignIn.GetCaptcha().then(res => {

        })
    }
}

export const AuthTC = (login: string, password: string, rememberMe: boolean, captcha?: string): ThunkAction<void, AppStateType, unknown, Action<string>> => {
    return (dispatch) => {

        dispatch(AuthIsFetching(true))

        SignIn.Authorisation(login, password, rememberMe, captcha).then(res => {
            if (res.resultCode === 0) {
                dispatch(authThunk())
                dispatch(AuthIsFetching(false))
            } else if (res.resultCode === 10) {
                SignIn.GetCaptcha().then(res => {
                    debugger
                    dispatch(SetCaptchaURL(res.url))
                    dispatch(AuthIsFetching(false))
                })
            } else {
                dispatch(stopSubmit('login', {_error: res.messages[0]}))
                dispatch(AuthIsFetching(false))
            }
        })
    }
}

export const Logout = (): ThunkAction<void, AppStateType, unknown, Action<string>> => {
    return (dispatch) => {
        dispatch(AuthIsFetching(true))

        SignIn.Logout().then(res => {
            if (res.resultCode === 0) {
                dispatch(AuthUser(res.data, false))
                // dispatch(setInitializeSuccess(false))
                dispatch(AuthIsFetching(false))
            }
        })
    }
}