import React from "react";
import s from './MyPosts.module.css';
import Post from "./Posts/Post";
import {postType} from "../../../Redux/postData-reducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";


type MyPostsType = {
    post: Array<postType>
    AddPostAC:(NewText:string)=>void
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

const AddNewPost = (value:AddPostType) =>{
    props.AddPostAC(value.NewPostText)
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

type AddPostType = {
    NewPostText:string
}

const AddPost:React.FC<InjectedFormProps<AddPostType>> = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.myPost}>
                    <Field component={'textarea'} name={'NewPostText'} placeholder={'AddYourNewPost'}/>
                <div>
                    <button >Add post</button>
                    {/*<button>Remove post</button>*/}
                </div>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<any, any>({form:'AddNewPostForm'})(AddPost)