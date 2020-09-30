import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {
    UserDataType,
    followThunk,
    unfollowThunk,
    changePageListUpp,
    setPage,
    toAndPage,
    toStartPage,
    toPageNumber,
    getUsersThunk, changePageListDown
} from "../../Redux/users-reduser";
import {Users} from "./Users";
import {Slider} from "../../common/Slider";
import s from "./users.module.css";
import {Preloader} from "../../common/preloader/Preloader";

export const UsersHookContainer = (() => {
    console.log("user container")
    const UsersProps = useSelector<AppStateType, UserDataType>(state => state.usersData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersThunk(UsersProps.currentPage, UsersProps.pageSize))
    }, [UsersProps.currentPage])

    const follow = useCallback((userId: number) => {
        dispatch(followThunk(userId))
    }, [])
    const unfollow = useCallback((userId: number) => {
        dispatch(unfollowThunk(userId))
    }, [])
    const PageListUpp = useCallback((pagesCount: number) => {
        dispatch(changePageListUpp(pagesCount))
    }, [])
    const PageListDown = useCallback(() => {
        dispatch(changePageListDown())
    }, [])
    const setCurrentPage = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [dispatch])
    const AndPage =useCallback( (pagesCount: number) => {
        dispatch(toAndPage(pagesCount))
    }, [])
    const StartPage = useCallback(() => {
        dispatch(toStartPage())
    }, [])
    const PageNumber =useCallback( (newPage: number, pagesCount: number) => {
        dispatch(toPageNumber(newPage, pagesCount))
    }, [])

    return (
        <div className={s.container}>
            {UsersProps.isFetching ? <div className={s.usersPreloader}><Preloader/></div> : null}
            <Slider isFetching={UsersProps.isFetching}
                    pagesNumberCount={UsersProps.pagesNumberCount}
                    startPagesCount={UsersProps.startPagesCount}
                    pageSize={UsersProps.pageSize}
                    totalUserCount={UsersProps.totalUserCount}
                    currentPage={UsersProps.currentPage}
                    nextPageList={PageListUpp}
                    prevPage={PageListDown}
                    onPageChange={setCurrentPage}
                    toAndPage={AndPage}
                    toStartPage={StartPage}
                    toPageNumber={PageNumber}
            />
            <Users users={UsersProps.users}
                   isFetching={UsersProps.isFetching}
                   followThunk={follow}
                   followInProgress={UsersProps.followInProgress}
                   unfollowThunk={unfollow}
            />
        </div>
    )
})