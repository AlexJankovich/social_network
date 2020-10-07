import React from "react";
import s from './MyPosts.module.css';
import Post from "./Posts/Post";
import {postType} from "../../../Redux/postData-reducer";
import {reduxForm, Field, InjectedFormProps, reset} from "redux-form";
import {MaxLengthCreator} from "../../../utils/validators/validators";
import {TextArea} from "../../../common/FormsControls/FormsControls";
import {useDispatch} from "react-redux";


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
    props.AddPostAC(value.NewPostText)
    dispatch(reset('AddNewPostForm'))
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

const MaxLength10 = MaxLengthCreator(10)

const AddPost:React.FC<InjectedFormProps<AddPostType>> = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.myPost}>
                    <Field component={TextArea}
                           name={'NewPostText'}
                           placeholder='AddYourNewPost'
                           validate={[MaxLength10]}
                    />
                <div>
                    <button>Add post</button>
                    {/*<button>Remove post</button>*/}
                </div>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<AddPostType>({form:'AddNewPostForm'})(AddPost)