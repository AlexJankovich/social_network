import React from "react";
import {MyPosts,} from "./Myposts/MyPosts";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {AddPostActionType, postDataType, WritePost} from "../../Redux/state";

type ProfileType = {
    postData: Array<postDataType>
    // addPost: () => void
    // writePost: (newText: string) => void
    newMessageData: string
    dispatch:(action: AddPostActionType | WritePost)=>void
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