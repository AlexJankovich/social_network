import {Dispatch} from "redux";
import {ProfileAPI} from "../api/api";

type AddPostActionType = {
    type: 'ADD-POST'
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
type TogglePhotoFetchingType = {
    type: 'TOGGLE-UPLOAD-PHOTO-FETCHING'
    uploadPhotoIsFetching: boolean
}

type SavePhotoActionType = {
    type: 'SAVE-PHOTO'
    photo: File
}

type UpdatePhotosAcType = {
    type: 'UPDATE-PROFILE-PHOTO'
    photos: {
        small: string | null
        large: string | null
    }
}

export type ActionType =
    AddPostActionType
    | setUserProfileActionType
    | SetStatusActionType
    | ToggleStatusFetchingType
    | SavePhotoActionType
    | TogglePhotoFetchingType
    | UpdatePhotosAcType

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
        large: string| null
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
    profile: profileUsersType  | null | {}
    status: string
    statusIsFetching: boolean
    uploadPhotoIsFetching: boolean
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
    profile:  null,
    status: '',
    statusIsFetching: false,
    uploadPhotoIsFetching: false
}
export const postReducer = (state: postDataType = initialState, action: ActionType): postDataType => {
    switch (action.type) {
        case "ADD-POST": {
            let NewPost = {
                id: '6',
                name: 'someName',
                message: action.newText,
                time: new Date().toTimeString().slice(0, 5),
                isRead: false
            };
            return {...state, post: [...state.post, NewPost]}
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
        case "TOGGLE-UPLOAD-PHOTO-FETCHING": {
            return {...state, statusIsFetching: action.uploadPhotoIsFetching}
        }

        case "UPDATE-PROFILE-PHOTO": {

                return {
                    ...state,
                    profile: {...state.profile, photos:action.photos}
                }

        }
        default:
            return state
    }
}

export const AddPostAC = (newText: string): ActionType => {
    return {type: "ADD-POST", newText}
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

export const ToggleUploadPhotoFetching = (uploadPhotoIsFetching: boolean): TogglePhotoFetchingType => {
    return {type: "TOGGLE-UPLOAD-PHOTO-FETCHING", uploadPhotoIsFetching}
}

export const UpdatePhotosAC = (photos: {
    small: string | null
    large: string | null
}): UpdatePhotosAcType => {
    return {type: "UPDATE-PROFILE-PHOTO", photos}
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

export const SavePhotoTC = (photo: File) => {
    return (dispatch: Dispatch) => {
        dispatch(ToggleUploadPhotoFetching(true))
        ProfileAPI.SavePhoto(photo).then(res => {
                if (res.resultCode === 0) {
                        dispatch(UpdatePhotosAC(res.data?.photos))
                    }
                return
            }
        )
        dispatch(ToggleUploadPhotoFetching(false))
    }
}