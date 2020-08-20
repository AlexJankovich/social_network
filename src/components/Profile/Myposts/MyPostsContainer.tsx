import React from "react";
import {AddPostAC, WritePostAC} from "../../../Redux/postData-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state:any)=>{
    return{
        post: state.postData.post,
        newMessageData: state.postData.newMessageData
    }
}

const mapDispatchToProps = (dispatch:any)=>{
    return {
        addPost:() => {
            // debugger
            dispatch(AddPostAC())
        },
        writePost : (message: string) => {
            const action = dispatch(WritePostAC(message))
            dispatch(action)
        }

    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


