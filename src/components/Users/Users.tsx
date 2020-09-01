import React, {useState} from "react";
import {UserInfoType} from "../../Redux/users-reduser";
import styles from './users.module.css';
import axios from 'axios';
import avaDefault from '../../assets/images/avaSamuray.jpg'

type UsersType = {
    users: Array<UserInfoType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UserInfoType>) => void
    setCurrentPage: (page: number) => void
    setTotalUsersCount: (totalUserCount: number) => void
    pagesNumberCount: number
    startPagesCount: number
    changePageListUpp: (pagesCount: number) => void
    changePageListDown: () => void
    toAndPage: (pagesCount: number) => void
    toStartPage: () => void
}

export class Users extends React.Component<UsersType, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChange = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUserCount / this.props.pageSize);
        let pages = [];
        for (let i = this.props.startPagesCount; i <= (this.props.startPagesCount + this.props.pagesNumberCount); i++) {
            pages.push(i)
        }
        return <div>
            <div className={styles.pageListWrapper}>
                <button onClick={() => {
                    this.props.toStartPage()
                    this.onPageChange(1)
                }}>
                    {"<<"}
                </button>
                <button onClick={this.props.changePageListDown}>
                    {'<'}
                </button>
                {pages.map(p => <span
                    className={this.props.currentPage === p ? styles.active : styles.hover}
                    onClick={() => {
                        this.onPageChange(p)
                    }}
                >
                    {p} </span>)}

                <button onClick={() => this.props.changePageListUpp(pagesCount)}>
                    {">"}
                </button>
                <button onClick={() => {
                    this.props.toAndPage(pagesCount)
                    this.onPageChange(pagesCount)
                }}>
                    {">>"}
                </button>

            </div>

            {
                this.props.users.map(u => {
                        const follow = () => {
                            this.props.follow(u.id)
                        }
                        const unfollow = () => {
                            this.props.unfollow(u.id)
                        }
                        return <div key={u.id} className={styles.usersWrapper}>
                            <div className={styles.avatarWrapper}>
                                <div>
                                    <img src={u.photos.small ? u.photos.small : avaDefault} className={styles.userPhoto}/>
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
}

