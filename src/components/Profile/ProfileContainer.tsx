import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {profileUsersType, SavePhotoTC} from "../../Redux/postData-reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps} from "react-router";
import {getProfileThunk} from "../../Redux/users-reduser";
import {Preloader} from "../../common/preloader/Preloader";
import pre from './Myposts/Profileinfo/ProfileInfo.module.scss'
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

type ProfileType = RouteComponentProps<PathParamsType> & {
    profile: profileUsersType | null
    isFetching: boolean
    meId: number
    isAuth: boolean
    getProfileThunk: (getQuestion: number) => void
    SetStatusTC: (newStatus: string) => void
    UpdateStatusTC: (newText: string) => void
    SavePhotoTC:(file:File)=>void
    uploadPhotoIsFetching: boolean
}

class ProfileClass extends React.Component<ProfileType> {

    MountProps() {
        let getQuestion = +this.props.match.params.userId
        if (!getQuestion) {
            getQuestion = this.props.meId
            if (!getQuestion) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileThunk(getQuestion)
    }

    componentDidMount() {
        this.MountProps()
    }

    componentDidUpdate(prevProps: ProfileType, prevState: AppStateType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.MountProps()
        }
    }

    loading = (load: boolean | null) => {
        if (load) {
            return <div className={pre.profilePreloader}>
                <Preloader/>
            </div>
        }
    }

    render() {
        return (
            <div className={pre.profileInfoWrapper}>
                {this.loading(this.props.isFetching ? this.props.isFetching : null)}
                {/*{this.loading(true)}*/}
                <Profile {...this.props}
                         SavePhoto={this.props.SavePhotoTC}
                />
            </div>
        );
    }
}


const MapStateToProps = (state: AppStateType) => ({
    profile: state.postData.profile,
    isFetching: state.usersData.isFetching,
    meId: state.auth.data.id,
})

export const ProfileContainer = compose<React.ComponentType>(
    connect(MapStateToProps, {getProfileThunk, SavePhotoTC}),
    withRouter,
    AuthRedirect
)(ProfileClass)


