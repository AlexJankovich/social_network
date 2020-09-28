import {Dispatch} from "redux";
import {ProfileAPI} from "../api/api";

type AddPostActionType = {
    type: 'ADD-POST'
}
type WritePostActionType = {
    type: 'WRITE-POST'
    newText: string
}
type setUserProfileActionType = {
    type: 'SET-USER-PROFILE'
    profile: profileUsersType
}
type SetStatusActionType = {
    type: 'SET-STATUS'
    newStatus: string
}
type ToggleStatusFetchingType = {
    type: 'TOGGLE-STATUS-FETCHING'
    statusIsFetching: boolean
}

export type ActionType =
    AddPostActionType
    | WritePostActionType
    | setUserProfileActionType
    | SetStatusActionType
    | ToggleStatusFetchingType

export type profileUsersType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }
}
export type postType = {
    id: string,
    name: string,
    message: string,
    time: string,
    isRead: boolean
}
export type postDataType = {
    post: Array<postType>
    newMessageData: string
    profile: profileUsersType | null
    status: string
    statusIsFetching: boolean
}

const initialState: postDataType = {
    post: [
        {
            id: '1',
            name: 'Артём',
            message: 'У меня дыра в голове ',
            time: '20:05',
            isRead: true
        },
        {
            id: '2',
            name: 'Артём',
            message: 'Уже две',
            time: '20:10',
            isRead: true
        },
        {
            id: '3',
            name: 'Артём',
            message: 'Теперь в голове сквозняк',
            time: '20:20',
            isRead: true
        },
        {
            id: '4',
            name: 'Артём',
            message: 'И сразу стало всё ништяк',
            time: '20:30',
            isRead: false
        },
        {
            id: '5',
            name: 'Артём',
            message: '))))',
            time: '20:35',
            isRead: false
        },
    ],
    newMessageData: '',
    profile: null,
    status: '',
    statusIsFetching: false,
}
export const postReducer = (state: postDataType = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-POST": {
            let NewPost = {
                id: '6',
                name: 'someName',
                message: state.newMessageData,
                time: new Date().toTimeString().slice(0, 5),
                isRead: false
            };
            return {...state, post: [...state.post, NewPost], newMessageData: ''}
        }
        case "WRITE-POST": {
            return {...state, newMessageData: action.newText}
        }
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET-STATUS": {
            return {...state, status: action.newStatus}
        }
        case "TOGGLE-STATUS-FETCHING": {
            return {...state, statusIsFetching: action.statusIsFetching}
        }
        default:
            return state
    }
}
export const AddPostAC = (): ActionType => {
    return {type: "ADD-POST"}
};
export const WritePostAC = (newText: string): WritePostActionType => {
    return {type: "WRITE-POST", newText: newText}
};
export const setUserProfile = (profile: profileUsersType): setUserProfileActionType => {
    return {type: "SET-USER-PROFILE", profile}
}
export const SetStatusAC = (newStatus: string): SetStatusActionType => {
    return {type: "SET-STATUS", newStatus}
}
export const ToggleStatusFetching = (statusIsFetching: boolean): ToggleStatusFetchingType => {
    return {type: "TOGGLE-STATUS-FETCHING", statusIsFetching}
}

export const SetStatusTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        ProfileAPI.GetProfileStatus(userId).then(res => {
                dispatch(SetStatusAC(res.data))
            }
        )
    }
}
export const UpdateStatusTC = (newText: string) => {
    return (dispatch: Dispatch) => {
        dispatch(ToggleStatusFetching(true))
        ProfileAPI.UpdateStatus(newText).then(res => {
            dispatch(ToggleStatusFetching(false))
            if (res.resultCode === 0) {
                dispatch(SetStatusAC(newText))
            }
        })
    }
}