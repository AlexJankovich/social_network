import React, {ChangeEvent, KeyboardEvent} from "react";
import styles from "./users.module.css";
import avaDefault from "../../assets/images/avaSamuray.jpg";
import {UserDataType} from "../../Redux/users-reduser";
import {NavLink} from "react-router-dom";

type UsersType = {
    userData: UserDataType
    follow: (userId: string) => void//Подписаться на пользователя
    unfollow: (userId: string) => void//Отписаться от пользователя
    nextPageList: (pagesCount: number) => void//к следующему списку страниц
    prevPage: () => void//к предидущему списку страниц
    toAndPage: (pagesCount: number) => void//в конец списка
    toStartPage: () => void//в начало списка
    onPageChange: (pageNumber: number) => void//загрузка текущей страницы
    setPage: (page: number) => void
    toPageNumber: () => void
    onChangeInput: (value: number | string) => void
}

export const Users = (props: UsersType) => {
    // debugger
    let pagesCount = Math.ceil(props.userData.totalUserCount / props.userData.pageSize);
    let pages: Array<number> = [];
    for (
        let i = props.userData.startPagesCount;
        i <= (props.userData.startPagesCount + props.userData.pagesNumberCount);
        i++
    ) {
        pages.push(i)
    }
    const listUpp = () => {
        props.nextPageList(pagesCount)
    }
    const toStartPage = () => {
        props.toStartPage()
        props.onPageChange(1)
    }
    const toEndPage = () => {
        props.toAndPage(pagesCount)
        props.onPageChange(pagesCount)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < 1 || +e.currentTarget.value > pagesCount) {
            props.onChangeInput('нет такой страницы')
        } else {
            props.onChangeInput(+e.target.value)
        }
    }
    const goToPageNumber = () => {
        props.toPageNumber()
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            goToPageNumber()
        }
    }
    return <div>

        <div className={styles.pageListWrapper}>
            <button
                onClick={() => toStartPage()}
                disabled={props.userData.isFetching}
            >
                {"<<"}
            </button>
            <button
                onClick={props.prevPage}
                disabled={props.userData.isFetching}
            >
                {'<'}
            </button>
            {pages.map(p => <span
                className={props.userData.currentPage === p ? styles.active : styles.hover}
                onClick={() => props.onPageChange(p)}
                key={p}
            >
                    {p} </span>)}

            <button
                onClick={listUpp}
                disabled={props.userData.isFetching}
            >
                {">"}
            </button>
            <button
                disabled={props.userData.isFetching}
                onClick={() => toEndPage()}
            >
                {">>"}
            </button>
            <input type='number'
                   placeholder='№'
                   onChange={onChange}
                   value={props.userData.inputPage == null ? '' : props.userData.inputPage}
                   className={styles.input}
                   onKeyPress={onKeyPress}
            />
            <button onClick={goToPageNumber}>Go</button>

        </div>

        {
            props.userData.users.map(u => {
                const follow = () => {
                    props.follow(u.id)
                }
                const unfollow = () => {
                    props.unfollow(u.id)
                }
                return <div key={u.id} className={styles.usersWrapper}>
                    <div className={styles.avatarWrapper}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small ? u.photos.small : avaDefault}
                                     className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>{u.followed ?
                            <button onClick={unfollow}>unFollow</button>
                            : <button onClick={follow}>Follow</button>}
                        </div>
                    </div>
                    <div className={styles.usersInfo}>
                        <div className={styles.nameAndStatus}>
                            <div className={styles.name}>{u.name}</div>
                            <div className={styles.status}>{u.status ? u.status : 'empty'}</div>
                        </div>
                        <div className={styles.usersLocation}>
                            <div className={styles.country}>{"u.location.country"}</div>
                            <div className={styles.city}>{"u.location.city"}</div>
                        </div>
                    </div>
                </div>
            }
        )
        }</div>
}