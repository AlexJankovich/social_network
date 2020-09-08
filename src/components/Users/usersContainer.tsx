import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {
    changePageListDown,
    changePageListUpp,
    follow, setPage, setTotalUsersCount,
    setUsers, toAndPage, toggleIsFetching, toStartPage,
    unfollow,
    UserInfoType,
    UserDataType, toPageNumber, followIsFetchingAC
} from "../../Redux/users-reduser";
import React from "react";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader";
import {Slider} from "../../common/Slider";
import {GetUsers} from "../../api/api";

type UsersApiType = {
    usersData: UserDataType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserInfoType>) => void
    setPage: (page: number) => void
    setTotalUsersCount: (totalUserCount: number) => void
    changePageListUpp: (pagesCount: number) => void
    changePageListDown: () => void
    toAndPage: (pagesCount: number) => void
    toStartPage: () => void
    toggleIsFetching: (isFetching: boolean) => void
    toPageNumber: (newPage: number, pagesCount:number ) => void
    followIsFetchingAC:(followIsFetching: boolean, userId: number)=>void
}

class UsersAPIComp extends React.Component<UsersApiType> {

    componentDidMount() {
        // debugger
        this.props.toggleIsFetching(true)
        GetUsers(this.props.usersData.currentPage, this.props.usersData.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            });
    }

    componentDidUpdate(prevProps: UsersApiType) {
        if (this.props.usersData.currentPage !== prevProps.usersData.currentPage) {
            this.props.toggleIsFetching(true)
            GetUsers(this.props.usersData.currentPage, this.props.usersData.pageSize)
                .then(data => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(data.items)
                });
        }

    }

    onPageChange = (pageNumber: number) => {
        this.props.setPage(pageNumber)
    }
    nextPageList = (pagesCount: number) => {
        this.props.changePageListUpp(pagesCount)
    }
    prevPage = () => {
        this.props.changePageListDown()
    }

    loading = (load: boolean) => {
        if (load) {
            return <Preloader/>
        }
    }

    render() {
        return (
            <>{this.loading(this.props.usersData.isFetching)}.
                <Slider {...this.props.usersData}
                        toPageNumber={this.props.toPageNumber}
                        toStartPage={this.props.toStartPage}
                        toAndPage={this.props.toAndPage}
                        onPageChange={this.onPageChange}
                        prevPage={this.prevPage}
                        nextPageList={this.nextPageList}
                />
                <Users users={this.props.usersData.users}
                       followInProgress={this.props.usersData.followInProgress}

                       // followIsFetching={this.props.usersData.followIsFetching}
                       isFetching={this.props.usersData.isFetching}
                       followIsFetchingAC={this.props.followIsFetchingAC}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       toggleIsFetching={this.props.toggleIsFetching}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersData: state.usersData,
        // isFetching:state.usersData.isFetching,
        // followIsFetching:state.usersData.followIsFetching
    }
}

export const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setPage,
    setTotalUsersCount,
    changePageListUpp,
    changePageListDown,
    toAndPage,
    toStartPage,
    toggleIsFetching,
    toPageNumber,
    followIsFetchingAC
})(UsersAPIComp)