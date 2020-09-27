import React, {useEffect, WheelEvent} from "react";
import s from './dialogs.module.css';
import {NavLink} from "react-router-dom";
import {dialogsType} from "../../Redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {changePageListDown, changePageListUpp, getUsersThunk, setPage, UserDataType} from "../../Redux/users-reduser";
import {Preloader} from "../../common/preloader/Preloader";

type DialogsType = {
    dialogs: Array<dialogsType>
}
const Dialogs = (props: DialogsType) => {
    debugger
    const userProps = useSelector<AppStateType, UserDataType>(state => state.usersData)
    const dispatch = useDispatch()

    // const [newPage, setNewPage] = useState<number | string>('')
    let pagesCount = Math.ceil(userProps.totalUserCount / userProps.pageSize);
    useEffect(() => {
        dispatch(getUsersThunk(userProps.currentPage, userProps.pageSize))
    }, [userProps.currentPage])

    const nextUserList = (pagesCount: number) => {
        dispatch(changePageListUpp(pagesCount))
    }
    const prevUsersList = () => {
        dispatch(changePageListDown())
    }

    const onScroll = (e: WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            dispatch(setPage(userProps.currentPage + 1))
        } else if (e.deltaY < 0) {
            dispatch(setPage(userProps.currentPage - 1))
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



