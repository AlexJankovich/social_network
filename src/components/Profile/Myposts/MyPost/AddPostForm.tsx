import {MaxLengthCreator} from "../../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./MyPosts.module.css";
import {TextArea} from "../../../../common/FormsControls/FormsControls";

export type AddPostType = {
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

export const AddPostReduxForm = reduxForm<AddPostType>({form:'AddNewPostForm'})(AddPost)