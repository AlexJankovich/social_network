import React from "react";
import s from './MyPosts.module.css';
import Post from "../Posts/Post";
import {postType} from "../../../../Redux/postData-reducer";
import { reset, stopSubmit} from "redux-form";
import {useDispatch} from "react-redux";
import {AddPostReduxForm, AddPostType} from "./AddPostForm";

type MyPostsType = {
    post: Array<postType>
    AddPostAC:(NewText:string)=>void
}

export const MyPosts = (props: MyPostsType) => {
    const dispatch=useDispatch()
    let postItem = props.post.map(p => {
        return <Post key={p.id}
                     message={p.message}
                     name={p.name}
                     time={p.time}
                     isRead={p.isRead}
                     id={p.id}/>
    })

const AddNewPost = (value:AddPostType) =>{
    if(!value.NewPostText) {
        dispatch(stopSubmit('AddNewPostForm', {NewPostText: 'Field is empty'}))}else {
        props.AddPostAC(value.NewPostText)
        dispatch(reset('AddNewPostForm'))
    }
}

    return (
        <div className={s.content}>
            <div>
                <div className={s.description}>
                    My posts
                </div>
                <AddPostReduxForm onSubmit={AddNewPost}/>
                <div className={s.posts}>
                    {postItem}
                </div>
            </div>
        </div>
    )
}
