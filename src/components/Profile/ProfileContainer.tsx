import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {profileUsersType} from "../../Redux/postData-reducer";
import {withRouter, Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps} from "react-router";
import {getProfileThunk}  from "../../Redux/users-reduser";
import {Preloader} from "../../common/preloader/Preloader";
import pre from './Myposts/Profileinfo/ProfileInfo.module.css'
import {AuthRedirect} from "../../hoc/AuthRedirect";

type PathParamsType = {
    userId: string
}

type ProfileType = RouteComponentProps<PathParamsType> & {
    profile: profileUsersType|null
    isFetching:boolean
    meId:number|null
    getProfileThunk:(getQuestion:number)=>void
    isAuth:boolean
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
                    <Profile profile={this.props.profile} />
            </>
        );
    }
}



let AuthRedirectComp = AuthRedirect(ProfileClass)
// const AuthRedirectComp = (props:ProfileType)=>{
//     if(!props.isAuth)return <Redirect to='/login'/>
//     return <ProfileClass {...props}/>
// }



const MapStateToProps = (state: AppStateType) => ({
    profile: state.postData.profile,
    isFetching: state.usersData.isFetching,
    meId:state.auth.data.id,
    // isAuth:state.auth.isAuth
})

const WithUrlData = withRouter(AuthRedirectComp)

export const ProfileContainer = connect(MapStateToProps, {
    getProfileThunk
})(WithUrlData);