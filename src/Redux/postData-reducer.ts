import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Action, Dispatch} from 'redux';
import {ProfileAPI} from '../api/api';
import {getProfileThunk} from './users-reduser';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {stopSubmit} from 'redux-form';

export type profileUsersType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  AboutMe: string
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
  profile: profileUsersType | {} | null
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
  profile: null,
  status: '',
  statusIsFetching: false,
  uploadPhotoIsFetching: false
};

const slice = createSlice({
  name: 'postData',
  initialState: initialState,
  reducers: {
    AddPostAC(state, actions: PayloadAction<{ newText: string }>) {
      let NewPost = {
        id: '6',
        name: 'someName',
        message: actions.payload.newText,
        time: new Date().toTimeString().slice(0, 5),
        isRead: false
      };
      state.post.push(NewPost);
    },
    setUserProfile(state, actions: PayloadAction<{ profile: profileUsersType }>) {
      state.profile = actions.payload.profile;
    },
    SetStatusAC(state, actions: PayloadAction<{ newStatus: string }>) {
      state.status = actions.payload.newStatus;
    },
    ToggleStatusFetching(state, actions: PayloadAction<{ statusIsFetching: boolean }>) {
      state.statusIsFetching = actions.payload.statusIsFetching;
    },
    ToggleUploadPhotoFetching(state, actions: PayloadAction<{ uploadPhotoIsFetching: boolean }>) {
      state.uploadPhotoIsFetching = actions.payload.uploadPhotoIsFetching;
    },
    UpdatePhotosAC(state, actions: PayloadAction<{
      photos: {
        small: string | null
        large: string | null
      }
    }>) {
      return {
        ...state,
        profile: {...state.profile, photos: actions.payload.photos}
      };
    },
  }
});

export const SetStatusTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    ProfileAPI.GetProfileStatus(userId).then(res => {
        dispatch(SetStatusAC({newStatus: res.data}));
      }
    );
  };
};

export const UpdateStatusTC = (newText: string) => {
  return (dispatch: Dispatch) => {
    dispatch(ToggleStatusFetching({statusIsFetching: true}));
    ProfileAPI.UpdateStatus(newText).then(res => {
      dispatch(ToggleStatusFetching({statusIsFetching: false}));
      if (res.resultCode === 0) {
        dispatch(SetStatusAC({newStatus: newText}));
      }
    });
  };
};

export const SavePhotoTC = (photo: File) => {
  return (dispatch: Dispatch) => {
    dispatch(ToggleUploadPhotoFetching({uploadPhotoIsFetching: true}));
    ProfileAPI.SavePhoto(photo).then(res => {
        if (res.resultCode === 0) {
          dispatch(UpdatePhotosAC({photos: res.data.photos}));
        }
        return;
      }
    );
    dispatch(ToggleUploadPhotoFetching({uploadPhotoIsFetching: false}));
  };
};

export const SaveProfile = (data: profileUsersType): ThunkAction<void, AppStateType, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(ToggleUploadPhotoFetching({uploadPhotoIsFetching:true}))
  const res = await ProfileAPI.SaveProfileInfo(data);
  if (res.resultCode === 0) {
    dispatch(getProfileThunk(getState().auth.data.id));
  } else {
    dispatch(stopSubmit('ProfileForm', {_error: res.messages}));
    return Promise.reject(res.messages);
  }
  dispatch(ToggleUploadPhotoFetching({uploadPhotoIsFetching:false}))
};


export const postReducer = slice.reducer;
export const {
  AddPostAC,
  setUserProfile,
  SetStatusAC,
  ToggleUploadPhotoFetching,
  ToggleStatusFetching,
  UpdatePhotosAC
} = slice.actions;