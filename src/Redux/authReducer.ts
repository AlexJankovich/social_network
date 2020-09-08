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