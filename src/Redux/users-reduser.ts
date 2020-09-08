type LocationType = {
    city: string,
    country: string
}

export type UserInfoType = {
    id: number,
    name: string,
    status: string,
    location: LocationType
    followed: boolean
    photos: {
        small: string
        large: string
    }
}

export type UserDataType = {
    users: Array<UserInfoType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    pagesNumberCount: number
    startPagesCount: number
    isFetching: boolean
    followInProgress: Array<number>
}

const initialState: UserDataType = {
    users: [],
    pageSize: 5,
    totalUserCount: 18,
    currentPage: 1,
    pagesNumberCount: 10,
    startPagesCount: 1,
    isFetching: false,
    followInProgress: []
}

type FollowACType = {
    type: 'FOLLOW'
    userId: number
}
type UnFollowACType = {
    type: 'UNFOLLOW'
    userId: number
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
    pagesCount: number
}
type changePageListDownType = {
    type: "CHANGE-PAGE-LIST-DOWN"
}
type toAndPageType = {
    type: "TO-AND-PAGE"
    pagesCount: number
}
type toStartPageType = {
    type: "TO-START-PAGE"
}
type toggleIsFetchingType = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}
type followInProgressType = {
    type: "TOGGLE-FOLLOW-IS-FETCHING"
    userId: number
    isFetching:boolean
}
type toPageNumberType = {
    type: 'TO-PAGE-NUMBER'
    newPage: number
    pagesCount: number
}
type changeInputValue = {
    type: 'ON-CHANGE-VALUE'
    value: number | string
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
    | toggleIsFetchingType
    | toPageNumberType
    | changeInputValue
    | followInProgressType


export const UsersReducer = (state: UserDataType = initialState, action: UsersActionType): UserDataType => {
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
        case "SET-TOTAL-USERS-COUNT": {
            return {...state, totalUserCount: action.totalCount}
        }
        case "CHANGE-PAGE-LIST-UPP": {
            debugger
            let newStartCount = state.startPagesCount + state.pagesNumberCount
            if ((newStartCount + state.pagesNumberCount) >= action.pagesCount) {
                newStartCount = action.pagesCount - state.pagesNumberCount
            }
            return {...state, startPagesCount: newStartCount, currentPage: newStartCount}
        }
        case "CHANGE-PAGE-LIST-DOWN": {
            let newStartCount = state.startPagesCount - state.pagesNumberCount
            if ((newStartCount - state.pagesNumberCount) <= 1) {
                newStartCount = 1
            }
            return {...state, startPagesCount: newStartCount, currentPage: newStartCount}
        }
        case "TO-AND-PAGE": {
            let newStartCount = action.pagesCount - state.pagesNumberCount
            return {...state, startPagesCount: newStartCount}
        }
        case "TO-START-PAGE": {
            return {...state, startPagesCount: 1, currentPage: 1}
        }
        case "SET-PAGE": {
            return {...state, currentPage: action.page}
        }
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TO-PAGE-NUMBER": {
            let newStartPage = action.newPage
            if (action.newPage + state.pagesNumberCount > action.pagesCount) {
                newStartPage = action.pagesCount - state.pagesNumberCount
            }
            return {
                ...state,
                currentPage: action.newPage,
                startPagesCount: newStartPage
            }
        }
        case "TOGGLE-FOLLOW-IS-FETCHING": {
            return {
                ...state,
                followInProgress:action.isFetching
                    ?[...state.followInProgress,action.userId]
                    :state.followInProgress.filter(id=>id!==action.userId)
            }
        }
        default:
            return state
    }
}
export const follow = (userId: number): FollowACType => {
    return {type: "FOLLOW", userId}
}
export let unfollow = (userId: number): UnFollowACType => {
    return {type: "UNFOLLOW", userId}
}
export const setUsers = (users: Array<UserInfoType>): setUsersAC => {
    return {type: 'SET-USERS', users}
}
export const setPage = (page: number): setPageType => {
    return {type: "SET-PAGE", page}
}
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountType => {
    return {type: "SET-TOTAL-USERS-COUNT", totalCount}
}
export const changePageListUpp = (pagesCount: number): changePageListUppType => {
    return {type: 'CHANGE-PAGE-LIST-UPP', pagesCount}
}
export const changePageListDown = (): changePageListDownType => {
    return {type: 'CHANGE-PAGE-LIST-DOWN'}
}
export const toAndPage = (pagesCount: number): toAndPageType => {
    return {type: 'TO-AND-PAGE', pagesCount}
}
export const toStartPage = (): toStartPageType => {
    return {type: 'TO-START-PAGE'}
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => {
    return {type: 'TOGGLE-IS-FETCHING', isFetching}
}
export const toPageNumber = (newPage: number, pagesCount: number): toPageNumberType => {
    return {type: "TO-PAGE-NUMBER", newPage, pagesCount}
}
export const followIsFetchingAC = ( isFetching:boolean, userId: number): followInProgressType => {
    return {type: "TOGGLE-FOLLOW-IS-FETCHING",isFetching, userId}
}
// export const onChangeInput = (value: number | string): changeInputValue => {
//     return {type: "ON-CHANGE-VALUE", value}
// }

// export type usersDispatchTypes={
//     follow:(userId: string)=>void,
//     unfollow:(userId: string)=>void,
//     setUsers:(users:  Array<UserInfoType>)=>void
// }