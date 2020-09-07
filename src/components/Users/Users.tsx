import React from "react";
import styles from "./users.module.css";
import avaDefault from "../../assets/images/avaSamuray.jpg";
import { UserInfoType} from "../../Redux/users-reduser";
import {NavLink} from "react-router-dom";

type UsersType = {
    users: Array<UserInfoType>
    follow: (userId: string) => void//Подписаться на пользователя
    unfollow: (userId: string) => void//Отписаться от пользователя
}

export const Users = (props: UsersType) => {

    return <div>
        {
            props.users.map(u => {
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