import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {profileUsersType} from "../../Redux/postData-reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps} from "react-router";
import {getProfileThunk}  from "../../Redux/users-reduser";
import {Preloader} from "../../common/Preloader";
import pre from './Myposts/Profileinfo/ProfileInfo.module.css'

type PathParamsType = {
    userId: string
}

type ProfileType = RouteComponentProps<PathParamsType> & {
    profile: profileUsersType|null
    isFetching:boolean
    meId:number|null
    getProfileThunk:(getQuestion:number)=>void
}

class ProfileClass extends React.Component<ProfileType> {
    componentDidMount() {
        let getQuestion:any = +this.props.match.params.userId
        if(!getQuestion){
            getQuestion=this.props.meId
        }
        this.props.getProfileThunk(+getQuestion)
        // this.props.toggleIsFetching(true)
        // GetProfileInfo(+getQuestion)
        //     .then(data => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUserProfile(data)
        //     });
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
                <div>
                    <Profile
                        profile={this.props.profile} />
                </div>
            </>
        );
    }
}

const MapStateToProps = (state: AppStateType) => ({
    profile: state.postData.profile,
    isFetching: state.usersData.isFetching,
    meId:state.auth.data.id
})

const WithUrlData = withRouter(ProfileClass)

export const ProfileContainer = connect(MapStateToProps, {
    getProfileThunk
})(WithUrlData);