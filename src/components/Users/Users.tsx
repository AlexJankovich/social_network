import React from "react";
import styles from "./users.module.css";
import avaDefault from "../../assets/images/avaSamuray.jpg";
import { UserInfoType} from "../../Redux/users-reduser";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {FollowToApi, unFollowToApi} from "../../api/api";

type UsersType = {
    users: Array<UserInfoType>
    isFetching:boolean
    follow: (userId: number) => void//Подписаться на пользователя
    unfollow: (userId: number) => void//Отписаться от пользователя
    toggleIsFetching:(isFetching:boolean)=>void
    followIsFetchingAC:(followIsFetching: boolean, userId: number)=>void
    followInProgress:Array<number>
}

export const Users = (props: UsersType) => {

    return <div>
        {
            props.users.map(u => {
                    const follow = () => {
                        props.followIsFetchingAC(true, u.id)
                        FollowToApi(u.id).then(data => {
                                props.followIsFetchingAC(false, u.id)
                                if (data.resultCode === 0) {props.follow(u.id)}
                        });
                    }
                    const unfollow = () => {
                        props.followIsFetchingAC(true, u.id)
                        unFollowToApi(u.id)
                            .then(response => {
                                props.followIsFetchingAC(false, u.id)
                                if (response.resultCode === 0) {
                                    props.unfollow(u.id)
                                }
                            });
                    }
                    return <div key={u.id} className={styles.usersWrapper}>
                        <div className={styles.avatarWrapper}>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small ? u.photos.small : avaDefault}
                                         className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div>{u.followed
                                ? <button onClick={unfollow}
                                          disabled={props.followInProgress.some(id=>id===u.id)}
                                >unFollow</button>
                                : <button onClick={follow}
                                          disabled={props.followInProgress.some(id=>id===u.id)}
                                >Follow</button>}
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