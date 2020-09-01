import React from "react";
import {AddPostAC, WritePostAC} from "../../../Redux/postData-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";

const mapStateToProps = (state:AppStateType)=>{
    return{
        post: state.postData.post,
        newMessageData: state.postData.newMessageData
    }
}

const mapDispatchToProps = (dispatch: Dispatch)=>{
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


