import React from "react";
import {AddPostAC, WritePostAC} from "../../../Redux/postData-reducer";
import {MyPosts} from "./MyPosts";

type MyPostsType = {
    store:any
}

export const MyPostsContainer = (props: MyPostsType) => {

    const addPost = () => {
        // debugger
        props.store.dispatch(AddPostAC())
    }
    const writePost = (message:string) => {
        props.store.dispatch(WritePostAC(message))
    }

    return <MyPosts post={props.store.getState().postData.post}
                    newMessageData={props.store.getState().postData.newMessageData}
                    addPost={addPost}
                    writePost={writePost}
    />

}

