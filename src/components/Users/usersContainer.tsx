import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {
    changePageListDown,
    changePageListUpp,
    setPage,
    toAndPage, toStartPage,
    UserDataType, toPageNumber, getUsersThunk, followThunk, unfollowThunk
} from "../../Redux/users-reduser";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader";
import {Slider} from "../../common/Slider";
import s from './users.module.css'

type UsersApiType = {
    usersData: UserDataType
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    setPage: (page: number) => void
    changePageListUpp: (pagesCount: number) => void
    changePageListDown: () => void
    toAndPage: (pagesCount: number) => void
    toStartPage: () => void
    toPageNumber: (newPage: number, pagesCount: number) => void
    getUsersThunk: (currentPage: number, pageSize: number) => void
}

class UsersAPIComp extends React.Component<UsersApiType> {

    componentDidMount() {
        // debugger
        this.props.getUsersThunk(this.props.usersData.currentPage, this.props.usersData.pageSize)
    }

    componentDidUpdate(prevProps: UsersApiType) {
        if (this.props.usersData.currentPage !== prevProps.usersData.currentPage) {
            this.props.getUsersThunk(this.props.usersData.currentPage, this.props.usersData.pageSize)
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
            return <div className={s.usersPreloader}><Preloader/></div>
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
                       isFetching={this.props.usersData.isFetching}
                       followThunk={this.props.followThunk}
                       unfollowThunk={this.props.unfollowThunk}
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
    setPage,
    changePageListUpp,
    changePageListDown,
    toAndPage,
    toStartPage,
    toPageNumber,

    getUsersThunk,
    followThunk,
    unfollowThunk
})(UsersAPIComp)