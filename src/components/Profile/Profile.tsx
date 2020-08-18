import React from "react";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {MyPostsContainer} from "./Myposts/MyPostsContainer";

type ProfileType = {
  store:any
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}