import React from "react";
import {MyPosts,} from "./Myposts/MyPosts";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {ActionType, postType} from "../../Redux/store";

type ProfileType = {
    postData: Array<postType>
    newMessageData: string
    dispatch:(action: ActionType)=>void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts post={props.postData}
                     dispatch={props.dispatch}
                     newMessageData={props.newMessageData}
            />
        </div>
    )
}