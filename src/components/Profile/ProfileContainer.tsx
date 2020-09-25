import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {profileUsersType} from "../../Redux/postData-reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps} from "react-router";
import {getProfileThunk}  from "../../Redux/users-reduser";
import {Preloader} from "../../common/preloader/Preloader";
import pre from './Myposts/Profileinfo/ProfileInfo.module.css'
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

type ProfileType = RouteComponentProps<PathParamsType> & {
    profile: profileUsersType|null
    isFetching:boolean
    meId:number|null
    getProfileThunk:(getQuestion:number)=>void
    isAuth:boolean
    status: string
    statusIsFetching:boolean
}

class ProfileClass extends React.Component<ProfileType> {
    componentDidMount() {
        let getQuestion:any = +this.props.match.params.userId
        if(!getQuestion){
            getQuestion=this.props.meId
        }
        this.props.getProfileThunk(+getQuestion)
    }
    loading = (load: boolean|null) => {
        if (load) {
            return <div className={pre.profilePreloader}><Preloader/></div>
        }
    }
    render() {

        return (
            <>
                {this.loading(this.props.isFetching?this.props.isFetching:null)}
                {/*{this.loading(true)}*/}
                    <Profile {...this.props} />
            </>
        );
    }
}

// let AuthRedirectComp = AuthRedirect(ProfileClass)

const MapStateToProps = (state: AppStateType) => ({
    profile: state.postData.profile,
    status: state.postData.status,
    statusIsFetching: state.postData.statusIsFetching,
    isFetching: state.usersData.isFetching,
    meId:state.auth.data.id,
    // isAuth:state.auth.isAuth
})

// const MapDispatchToProps = (dispatch: Dispatch) =>{
//     return{
//     getProfileThunk:dispatch(getProfileThunk())
//     }
// }

export const ProfileContainer = compose<React.ComponentType>(
    connect(MapStateToProps, {getProfileThunk}),
    withRouter,
    AuthRedirect
)(ProfileClass)

// const WithUrlData = withRouter(AuthRedirectComp)

// export const ProfileContainer = connect(MapStateToProps, {getProfileThunk})(WithUrlData);
// export const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(WithUrlData);

