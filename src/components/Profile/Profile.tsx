import React from "react";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {profileUsersType} from "../../Redux/postData-reducer";
import {MyPostsContainer} from "./Myposts/MyPostsContainer";
import s from './Profile.module.css'

type ProfileType = {
    profile: profileUsersType | null
    isFetching:boolean
}

export const Profile = (props: ProfileType) => {
    return (
        <div className={props.isFetching?s.shadow:''}>
            <ProfileInfo {...props}/>
            <MyPostsContainer/>
        </div>
    )
}