import React from "react";
import styles from "./users.module.css";
import avaDefault from "../../assets/images/avaSamuray.jpg";
import {UserInfoType} from "../../Redux/users-reduser";
import {NavLink} from "react-router-dom";

type UsersType = {
    users: Array<UserInfoType>
    isFetching: boolean
    followThunk: (userId: number) => void//Подписаться на пользователя
    unfollowThunk: (userId: number) => void//Отписаться от пользователя
    followInProgress: Array<number>
}

export const Users = React.memo((props: UsersType) => {
    console.log('users')

    // const RedirectToUserProfile = (id:number)=>{
    //  debugger
    //  return <Redirect to={`/profile/${id}`}/>
    // }

    return <div className={props.isFetching ? styles.shadow : ''}>
        {
            props.users.map(u => {
                const follow = () => props.followThunk(u.id)
                const unfollow = () => props.unfollowThunk(u.id)

                return <div key={u.id} className={styles.usersWrapper}>
                    <div className={styles.avatarWrapper}>
                        <div>
                            <NavLink to={'/profile/' + u.id}
                            >
                                <img src={u.photos.small ? u.photos.small : avaDefault}
                                     className={styles.userPhoto}
                                    // onClick={()=>RedirectToUserProfile(u.id)}
                                     alt="Здесь должно быть лицо"
                                />
                            </NavLink>
                        </div>
                        <div>{u.followed
                            ? <button onClick={unfollow}
                                      disabled={props.followInProgress.some(id => id === u.id)}
                            >unFollow</button>
                            : <button onClick={follow}
                                      disabled={props.followInProgress.some(id => id === u.id)}
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
})