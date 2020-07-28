import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import Post from "./Posts/Post";
import {AddPostActionType, postDataType, WritePost} from "../../../Redux/state";

type MyPostsType = {
    postData: Array<postDataType>
    // addPost: () => void
    // writePost: (newText: string) => void
    newMessageData: string
    dispatch:(action: AddPostActionType | WritePost)=>void
}

export const MyPosts = (props: MyPostsType) => {
    let postItem = props.postData.map(p => {
        return <Post key={p.id}
                     message={p.message}
                     name={p.name}
                     time={p.time}
                     isRead={p.isRead}
                     id={p.id}/>
    })

    let addPost = () => {
        // props.dispatch({type:'ADD-POST'})
        props.dispatch({type:"ADD-POST"})
    }
    let writePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type:"WRITE-POST", newText:(e.currentTarget.value)} )
    }

    return (
        <div className={s.content}>
            <div>
                <div className={s.description}>
                    My posts
                </div>
                <div className={s.myPost}>
                    <textarea value={props.newMessageData} onChange={writePost}></textarea>
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

