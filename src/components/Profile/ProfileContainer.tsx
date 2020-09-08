import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {setUserProfile, profileUsersType} from "../../Redux/postData-reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps} from "react-router";
import {toggleIsFetching} from "../../Redux/users-reduser";
import {Preloader} from "../../common/Preloader";
import {GetProfileInfo} from "../../api/api";

type PathParamsType = {
    userId: string
}

type ProfileType = RouteComponentProps<PathParamsType> & {
    setUserProfile: (profile: profileUsersType) => void
    profile: profileUsersType|null
    isFetching:boolean
    toggleIsFetching:(isFetching: boolean)=>void
    meId:number|null
}

class ProfileClass extends React.Component<ProfileType> {
    componentDidMount() {
        let getQuestion:any = +this.props.match.params.userId
        if(!getQuestion){
            getQuestion=this.props.meId
        }
        this.props.toggleIsFetching(true)
        GetProfileInfo(+getQuestion)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUserProfile(data)
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
                {this.loading(this.props.isFetching)}
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
    setUserProfile, toggleIsFetching
})(WithUrlData);