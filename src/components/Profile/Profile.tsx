import React from "react";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {profileUsersType} from "../../Redux/postData-reducer";
import {MyPostsContainer} from "./Myposts/MyPostsContainer";

type ProfileType = {
  profile:profileUsersType|null
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}