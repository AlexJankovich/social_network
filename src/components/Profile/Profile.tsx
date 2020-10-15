import React from "react";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {profileUsersType} from "../../Redux/postData-reducer";
import {MyPostsContainer} from "./Myposts/MyPostsContainer";
import s from './Profile.module.css'

type ProfileType = {
    profile: profileUsersType | null
    isFetching:boolean
    meId:number
    SavePhoto:(file:File)=>void
    uploadPhotoIsFetching: boolean
}

export const Profile = (props: ProfileType) => {
    return (
        <div
            className={props.isFetching?s.profileWrapper+' ' +s.shadow:s.profileWrapper}
        >
            <ProfileInfo {...props}/>
            <MyPostsContainer />
        </div>
    )
}