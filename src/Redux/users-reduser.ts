import {ProfileAPI, UserAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {Action, Dispatch} from "redux";
import {AppStateType, InferActionTypes} from "./redux-store";
import {setUserProfile} from "./postData-reducer";

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
            if (action.page) {
                return {...state, currentPage: action.page}
            }
            return state
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
                followInProgress: action.isFetching
                    ? [...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

// type ReturnedActionsTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type UsersActionType = ReturnType<ReturnedActionsTypes<typeof actions>>

type UsersActionType = InferActionTypes<typeof actions>

export const actions = {
    follow: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollow: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserInfoType>) => ({type: 'SET-USERS', users} as const),
    setPage: (page: number) => ({type: "SET-PAGE", page} as const),
    setTotalUsersCount: (totalCount: number) => ({type: "SET-TOTAL-USERS-COUNT", totalCount} as const),
    changePageListUpp: (pagesCount: number) => ({type: 'CHANGE-PAGE-LIST-UPP', pagesCount} as const),
    changePageListDown: () => ({type: 'CHANGE-PAGE-LIST-DOWN'} as const),
    toAndPage: (pagesCount: number) => ({type: 'TO-AND-PAGE', pagesCount} as const),
    toStartPage: () => ({type: 'TO-START-PAGE'} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const),
    toPageNumber: (newPage: number, pagesCount: number) => ({type: "TO-PAGE-NUMBER", newPage, pagesCount} as const),
    followIsFetchingAC: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE-FOLLOW-IS-FETCHING",
        isFetching,
        userId
    } as const)
}

export const getUsersThunk = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        UserAPI.GetUsers(currentPage, pageSize)
            .then(data => {
                dispatch(actions.toggleIsFetching(false))
                dispatch(actions.setUsers(data.items))
                dispatch(actions.setTotalUsersCount(data.totalCount))
            });
    }
}

export const followThunk = (userId: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
    return (dispatch) => {
        dispatch(actions.followIsFetchingAC(true, userId))
        UserAPI.FollowToApi(userId).then(data => {
            dispatch(actions.followIsFetchingAC(false, userId))
            if (data.resultCode === 0) {
                dispatch(actions.follow(userId))
            }
        });
    }
}

export const unfollowThunk = (userId: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
    return (dispatch) => {
        dispatch(actions.followIsFetchingAC(true, userId))
        UserAPI.unFollowToApi(userId)
            .then(response => {
                dispatch(actions.followIsFetchingAC(false, userId))
                if (response.resultCode === 0) {
                    dispatch(actions.unfollow(userId))
                }
            });
    }
}

export const getProfileThunk = (getQuestion: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
    return (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        ProfileAPI.GetProfileInfo(getQuestion)
            .then(data => {
                dispatch(actions.toggleIsFetching(false))
                dispatch(setUserProfile(data))
            });
    }
}
