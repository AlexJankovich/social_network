type LocationType = {
    city: string,
    country: string
}

export type UserInfoType = {
    id: string,
    name: string,
    status: string,
    location: LocationType
    followed: boolean
    photos: {
        small: string
        large: string
    }
}

type UserDataType = {
    users: Array<UserInfoType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    pagesNumberCount: number
    startPagesCount: number
}

const initialState: UserDataType = {
    users: [],
    pageSize: 5,
    totalUserCount: 18,
    currentPage: 1,
    pagesNumberCount:10,
    startPagesCount: 1,
}

type FollowACType = {
    type: 'FOLLOW'
    userId: string
}
type UnFollowACType = {
    type: 'UNFOLLOW'
    userId: string
}
type setUsersAC = {
    type: 'SET-USERS',
    users: Array<UserInfoType>
}
type setPageType = {
    type: 'SET-PAGE'
    page: number
}
type setTotalUsersCountType = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalCount: number
}
type changePageListUppType = {
    type: "CHANGE-PAGE-LIST-UPP"
    pagesCount:number
}
type changePageListDownType = {
    type: "CHANGE-PAGE-LIST-DOWN"
}
type toAndPageType = {
    type: "TO-AND-PAGE"
    pagesCount:number
}
type toStartPageType = {
    type: "TO-START-PAGE"
}

export type UsersActionType =
    FollowACType
    | UnFollowACType
    | setUsersAC
    | setPageType
    | setTotalUsersCountType
    | changePageListUppType
    | changePageListDownType
    | toAndPageType
    | toStartPageType



export const UsersReducer = (state: UserDataType = initialState, action: UsersActionType) => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state, users: state.users.map(u => {
                    if (action.userId === u.id) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        }
        case "UNFOLLOW": {
            return {
                ...state, users: state.users.map(u => {
                    if (action.userId === u.id) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        }
        case "SET-USERS": {
            return {...state, users: action.users}
        }
        case "SET-PAGE": {
            return {...state, currentPage: action.page}
        }
        case "SET-TOTAL-USERS-COUNT": {
            return {...state, totalUserCount: action.totalCount}
        }
        case "CHANGE-PAGE-LIST-UPP":{
            let newStartCount = state.startPagesCount+state.pagesNumberCount
            if((newStartCount+state.pagesNumberCount)>=action.pagesCount){
                newStartCount=action.pagesCount-state.pagesNumberCount
            }
            return {...state, startPagesCount:newStartCount }
        }
        case "CHANGE-PAGE-LIST-DOWN":{
            let newStartCount = state.startPagesCount-state.pagesNumberCount
            if((newStartCount-state.pagesNumberCount)<=1){
                newStartCount=1
            }
            return {...state, startPagesCount:newStartCount }
        }
        case "TO-AND-PAGE":{
            let newStartCount = action.pagesCount-state.pagesNumberCount
            return {...state, startPagesCount:newStartCount }
        }
        case "TO-START-PAGE":{
            return {...state, startPagesCount:1, currentPage:1}
        }
        default:
            return state
    }
}
export const FollowAC = (userId: string): FollowACType => {
    return {type: "FOLLOW", userId}
}
export let UnFollowAC = (userId: string): UnFollowACType => {
    return {type: "UNFOLLOW", userId}
}
export const setUsersAC = (users: Array<UserInfoType>): setUsersAC => {
    return {type: 'SET-USERS', users}
}
export const SetPageAC = (page: number): setPageType => {
    return {type: "SET-PAGE", page}
}
export const setTotalUsersCountAC = (totalCount: number): setTotalUsersCountType => {
    return {type: "SET-TOTAL-USERS-COUNT", totalCount}
}
export const ChangePageListUppAC=(pagesCount:number):changePageListUppType=>{
    return{type:'CHANGE-PAGE-LIST-UPP', pagesCount}
}
export const ChangePageListDownAC=():changePageListDownType=>{
    return{type:'CHANGE-PAGE-LIST-DOWN'}
}
export const ToAndPageAC=(pagesCount:number):toAndPageType=>{
    return{type:'TO-AND-PAGE', pagesCount}
}
export const ToStartPageAC=():toStartPageType=>{
    return{type:'TO-START-PAGE'}
}

// export type usersDispatchTypes={
//     follow:(userId: string)=>void,
//     unfollow:(userId: string)=>void,
//     setUsers:(users:  Array<UserInfoType>)=>void
// }