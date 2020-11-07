import {MaxLengthCreator} from "../../../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./MyPosts.module.css";
import {createField, TextArea} from "../../../../common/FormsControls/FormsControls";

export type AddPostType = {
    NewPostText:string
}

const MaxLength10 = MaxLengthCreator(10)

const AddPost:React.FC<InjectedFormProps<AddPostType>> = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.myPost}>
                {createField<keyof AddPostType>(
                    'AddYourNewPost',
                    'NewPostText',
                    [MaxLength10],
                    TextArea,
                    'text')}
                <div>
                    <button>Add post</button>
                    {/*<button>Remove post</button>*/}
                </div>
            </div>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<AddPostType>({form:'AddNewPostForm'})(AddPost)