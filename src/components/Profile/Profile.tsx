import React from "react";
import {MyPosts,} from "./Myposts/MyPosts";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {ActionType, postDataType} from "../../Redux/state";

type ProfileType = {
    postData: Array<postDataType>
    newMessageData: string
    dispatch:(action: ActionType)=>void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postData={props.postData}
                     dispatch={props.dispatch}
                     newMessageData={props.newMessageData}
            />
        </div>
    )
}