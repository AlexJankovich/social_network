import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ProfileAPI, UserAPI} from '../api/api';
import {setUserProfile} from './postData-reducer';
import {AppStateType} from './redux-store';

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
};

const slice = createSlice({
  name: 'usersData',
  initialState: initialState,
  reducers: {
    follow(state, actions: PayloadAction<{ userId: number }>) {
      return {
        ...state, users: state.users.map(u => {
          if (actions.payload.userId === u.id) {
            return {...u, followed: true};
          }
          return u;
        })
      };
    },
    unfollow(state, actions: PayloadAction<{ userId: number }>) {
      return {
        ...state, users: state.users.map(u => {
          if (actions.payload.userId === u.id) {
            return {...u, followed: false};
          }
          return u;
        })
      };
    },
    setUsers(state, actions: PayloadAction<{ users: Array<UserInfoType> }>) {
      state.users = actions.payload.users;
    },
    setPage(state, actions: PayloadAction<{ page: number }>) {
      state.currentPage = actions.payload.page;
    },
    setTotalUsersCount(state, actions: PayloadAction<{ totalCount: number }>) {
      state.totalUserCount = actions.payload.totalCount;
    },
    changePageListUpp(state, actions: PayloadAction<{ pagesCount: number }>) {
      let newStartCount = state.startPagesCount + state.pagesNumberCount;
      if ((newStartCount + state.pagesNumberCount) >= actions.payload.pagesCount) {
        newStartCount = actions.payload.pagesCount - state.pagesNumberCount;
      }
      state.startPagesCount = newStartCount;
      state.currentPage = newStartCount;
    },
    changePageListDown(state) {
      let newStartCount = state.startPagesCount - state.pagesNumberCount;
      if ((newStartCount - state.pagesNumberCount) <= 1) {
        newStartCount = 1;
      }
      state.currentPage = newStartCount;
      state.startPagesCount = newStartCount;
    },
    toAndPage(state, actions: PayloadAction<{ pagesCount: number }>) {
      // let newStartCount = action.pagesCount - state.pagesNumberCount;
      state.startPagesCount = actions.payload.pagesCount - state.pagesNumberCount;
      // return {...state, startPagesCount: newStartCount};
    },
    toStartPage(state) {
      state.startPagesCount = 1;
      state.currentPage = 1;
    },
    toggleIsFetching(state, actions: PayloadAction<{ isFetching: boolean }>) {
      state.isFetching = actions.payload.isFetching
    },
    toPageNumber(state, actions: PayloadAction<{ newPage: number, pagesCount: number }>) {
      let newStartPage = actions.payload.newPage;
      if (actions.payload.newPage + state.pagesNumberCount > actions.payload.pagesCount) {
        newStartPage = actions.payload.pagesCount - state.pagesNumberCount;
      }
      state.currentPage = actions.payload.newPage
      state.startPagesCount = newStartPage
    },
    followIsFetchingAC(state, actions: PayloadAction<{ isFetching: boolean, userId: number }>) {
      return {
        ...state,
        followInProgress: actions.payload.isFetching
          ? [...state.followInProgress, actions.payload.userId]
          : state.followInProgress.filter(id => id !== actions.payload.userId)
      };
    },
    // follow(state, actions:PayloadAction<{}>){},
  }
});

export const getUsersThunk = (currentPage: number, pageSize: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFetching({isFetching:true}));
    UserAPI.GetUsers(currentPage, pageSize)
      .then(data => {
        dispatch(toggleIsFetching({isFetching:false}));
        dispatch(setUsers({users:data.items}));
        dispatch(setTotalUsersCount({totalCount:data.totalCount}));
      });
  };
};

export const followThunk = (userId: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(followIsFetchingAC({isFetching:true, userId}));
    UserAPI.FollowToApi(userId).then(data => {
      dispatch(followIsFetchingAC({isFetching:false, userId}));
      if (data.resultCode === 0) {
        dispatch(follow({userId}));
      }
    });
  };
};

export const unfollowThunk = (userId: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(followIsFetchingAC({isFetching:true, userId}));
    UserAPI.unFollowToApi(userId)
      .then(response => {
        dispatch(followIsFetchingAC({isFetching:false, userId}));
        if (response.resultCode === 0) {
          dispatch(unfollow({userId}));
        }
      });
  };
};

export const getProfileThunk = (getQuestion: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(toggleIsFetching({isFetching:true}));
    ProfileAPI.GetProfileInfo(getQuestion)
      .then(data => {
        dispatch(toggleIsFetching({isFetching:false}));
        dispatch(setUserProfile({profile: data}));
      });
  };
};


export const UsersReducer = slice.reducer
export const {
  setPage,
  setUsers,
  followIsFetchingAC,
  toggleIsFetching,
  toPageNumber,
  toStartPage,
  toAndPage,
  changePageListDown,
  changePageListUpp,
  setTotalUsersCount,
  unfollow,
  follow
} = slice.actions