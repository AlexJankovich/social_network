import React, {useEffect, WheelEvent} from "react";
import s from './dialogs.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {getUsersThunk, actions, UserDataType} from "../../Redux/users-reduser";
import {Preloader} from "../../common/preloader/Preloader";


const Dialogs = () => {
    const userProps = useSelector<AppStateType, UserDataType>(state => state.usersData)
    const dispatch = useDispatch()

    let pagesCount = Math.ceil(userProps.totalUserCount / userProps.pageSize);
    useEffect(() => {
        dispatch(getUsersThunk(userProps.currentPage, userProps.pageSize))
    }, [userProps.currentPage,  userProps.pageSize, dispatch])

    const nextUserList = (pagesCount: number) => {
        dispatch(actions.changePageListUpp(pagesCount))
    }
    const prevUsersList = () => {
        dispatch(actions.changePageListDown())
    }

    const onScroll = (e: WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            dispatch(actions.setPage(userProps.currentPage + 1))
        } else if (e.deltaY < 0) {
            dispatch(actions.setPage(userProps.currentPage - 1))
        }
    }


    const Dialogs = userProps.users.map((d) =>
        <div key={d.id} className={s.dialog}>
            <NavLink to={'/profile/' + d.id}>
                {d.name}
            </NavLink>
        </div>)

    return (<>
            <>{userProps.isFetching ? <div className={s.dialogsPreloader}><Preloader/></div> : null}</>
            <div className={userProps.isFetching ? s.shadow : ''}>
                <div>
                    <button onClick={() => prevUsersList()}
                            disabled={userProps.isFetching}
                    >{"<<"}</button>
                </div>
                <div onWheel={(e) => onScroll(e)}>
                    {Dialogs}
                </div>
                <div>
                    <button onClick={() => nextUserList(pagesCount)}
                            disabled={userProps.isFetching}
                    >{">>"}</button>
                </div>
            </div>
        </>
    )
}

export default Dialogs;



