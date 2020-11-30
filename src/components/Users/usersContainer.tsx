import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import { UserDataType, toStartPage,} from "../../Redux/users-reduser";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../../common/preloader/Preloader";
import {Slider} from "../../common/slider/Slider";
import s from './users.module.scss'
import {Dispatch} from "redux";

type UsersApiType = {
    usersData: UserDataType
    isAuth:boolean
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

    componentDidUpdate(prevProps: UsersApiType, prevState:UserDataType) {
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
            <div className={s.container}>
                {this.loading(this.props.usersData.isFetching)}.
                <div className={s.u}><Slider {...this.props.usersData}
                           toPageNumber={this.props.toPageNumber}
                           toStartPage={this.props.toStartPage}
                           toAndPage={this.props.toAndPage}
                           onPageChange={this.onPageChange}
                           prevPage={this.prevPage}
                           nextPageList={this.nextPageList}
                />
                    <Users {...this.props.usersData}
                           followThunk={this.props.followThunk}
                           unfollowThunk={this.props.unfollowThunk}
                    /></div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersData: state.usersData,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps =(dispatch:Dispatch) => {
    return{
        toStartPage:()=>dispatch(toStartPage())
    }
}

// const userActions = {
//     ...actions.toStartPage,
//     ...actions.toAndPage,
//     ...actions.toPageNumber,
//     ...actions.changePageListDown,
//     ...actions.changePageListUpp
// }

export const UsersContainer = connect(mapStateToProps, {
    // getUsersThunk,
    // followThunk,
    // unfollowThunk,
    // ...actions.toStartPage
    toStartPage: toStartPage,

})(UsersAPIComp)
// export const UsersContainer = connect(mapStateToProps, mapDispatchToProps
// )(UsersAPIComp)