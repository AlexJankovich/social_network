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
    getUsersThunk
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

    const changePageListDown =useCallback( () => {
        dispatch(changePageListDown())
    },[dispatch])
    const follow = useCallback((userId: number) => {
        dispatch(followThunk(userId))
    }, [dispatch])
    const unfollow = useCallback((userId: number) => {
        dispatch(unfollowThunk(userId))
    }, [dispatch])
    const PageListUpp = useCallback((pagesCount: number) => {
        dispatch(changePageListUpp(pagesCount))
    }, [dispatch])
    const PageListDown = useCallback(() => {
        dispatch(changePageListDown())
    }, [dispatch])
    const setCurrentPage = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [dispatch])
    const AndPage =useCallback( (pagesCount: number) => {
        dispatch(toAndPage(pagesCount))
    }, [dispatch])
    const StartPage = useCallback(() => {
        dispatch(toStartPage())
    }, [dispatch])
    const PageNumber =useCallback( (newPage: number, pagesCount: number) => {
        dispatch(toPageNumber(newPage, pagesCount))
    }, [dispatch])

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