import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../Redux/redux-store";
import {
    ChangePageListDownAC,
    ChangePageListUppAC,
    FollowAC, SetPageAC, setTotalUsersCountAC,
    setUsersAC, ToAndPageAC, ToStartPageAC,
    UnFollowAC,
    UserInfoType,
} from "../../Redux/users-reduser";
import {Dispatch} from "redux";

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersData.users,
        pageSize: state.usersData.pageSize,
        totalUserCount: state.usersData.totalUserCount,
        currentPage: state.usersData.currentPage,
        pagesNumberCount:state.usersData.pagesNumberCount,
        startPagesCount:state.usersData.startPagesCount
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: string) => {
            dispatch(FollowAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(UnFollowAC(userId))
        },
        setUsers: (users:Array<UserInfoType>)=>{
            dispatch(setUsersAC(users))
        },
        setCurrentPage:(page:number)=>{
            dispatch(SetPageAC(page))
        },
        setTotalUsersCount:(totalUserCount:number)=>{
            dispatch(setTotalUsersCountAC(totalUserCount))
        },
        changePageListUpp:(pagesCount:number)=>{
            dispatch(ChangePageListUppAC(pagesCount))
        },
        changePageListDown:()=>{
            dispatch(ChangePageListDownAC())
        },
        toAndPage:(pagesCount:number)=>{
            dispatch(ToAndPageAC(pagesCount))
        },
        toStartPage:()=>{
            dispatch(ToStartPageAC())
        }
    }

}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)