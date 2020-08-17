import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import Post from "./Posts/Post";
import {ActionType, postType} from "../../../Redux/store";
import {AddPostAC, WritePostAC} from "../../../Redux/postData-reducer";

type MyPostsType = {
    post: Array<postType>
    newMessageData: string
    dispatch:(action: ActionType)=>void
}

export const MyPosts = (props: MyPostsType) => {
    let postItem = props.post.map(p => {
        return <Post key={p.id}
                     message={p.message}
                     name={p.name}
                     time={p.time}
                     isRead={p.isRead}
                     id={p.id}/>
    })

    const addPost = () => {
        // debugger
        props.dispatch(AddPostAC())
    }
    const writePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(WritePostAC(e.currentTarget.value))
    }

    return (
        <div className={s.content}>
            <div>
                <div className={s.description}>
                    My posts
                </div>
                <div className={s.myPost}>
                    <textarea value={props.newMessageData}
                              onChange={writePost}>x</textarea>
                    <div>
                        <button onClick={addPost}>Add post</button>
                        <button>Remove post</button>
                    </div>
                </div>
                <div className={s.posts}>
                    {postItem}
                </div>
            </div>
        </div>
    )
}

