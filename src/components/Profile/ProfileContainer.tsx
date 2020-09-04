import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile, profileUsersType} from "../../Redux/postData-reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps} from "react-router";
import {toggleIsFetching} from "../../Redux/users-reduser";
import {Preloader} from "../../common/Preloader";

type PathParamsType = {
    userId: string
}

type ProfileType = RouteComponentProps<PathParamsType> & {
    setUserProfile: (profile: profileUsersType) => void
    profile: profileUsersType|null
    isFetching:boolean
    toggleIsFetching:(isFetching: boolean)=>void
}

class ProfileClass extends React.Component<ProfileType, profileUsersType> {
    componentDidMount() {
        let getQuestion = this.props.match.params.userId
        if(!getQuestion){
            getQuestion="2"
        }
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + getQuestion)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUserProfile(response.data)
            });
    }
    loading=(load:boolean)=>{
        if(load){
            return <Preloader/>
        }
    }
    render() {
        return (
            <>
                {/*{this.loading(this.props.isFetching)}*/}
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
    isFetching: state.usersData.isFetching
})

const WithUrlData = withRouter(ProfileClass)

export const ProfileContainer = connect(MapStateToProps, {
    setUserProfile, toggleIsFetching
})(WithUrlData);