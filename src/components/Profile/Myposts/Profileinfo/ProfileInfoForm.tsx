import s from "./ProfileInfo.module.scss";
import React from "react";
import {profileUsersType} from "../../../../Redux/postData-reducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input, TextArea} from "../../../../common/FormsControls/FormsControls";

type ProfileFormType = {
    profile: profileUsersType
}

const ProfileForm: React.FC<InjectedFormProps<profileUsersType> & ProfileFormType> =React.memo( (props) => {
    return (
        <div className={s.contactWrapper}>
            <div className={s.contactName}>
                <form onSubmit={props.handleSubmit}>
                    <Field
                        name={'fullName'}
                        placeholder={'fullName'}
                        type='text'
                        component={Input}
                    />
                    <Field
                        name={'AboutMe'}
                        placeholder={'AboutMe'}
                        type='text'
                        component={Input}
                    />
                    <label htmlFor=""> {"lookingForAJob"}</label>
                    <Field
                        name={'lookingForAJob'}
                        placeholder={'lookingForAJob'}
                        type='checkbox'
                        component={'input'}
                    />
                    <Field
                        name={'lookingForAJobDescription'}
                        placeholder={'JobSkills'}
                        type='text'
                        component={TextArea}
                    />
                    <div>
                        <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                        return <div key={key}>
                            {key}:{<Field
                                name = {`contacts.${key}`}
                                placeholder={key}
                                type='text'
                                component={Input}
                        />}
                        </div>
                    })}
                    </div>
                    <button> save</button>
                </form>
            </div>
            {props.error}
        </div>)
})

export const ProfileReduxForm = reduxForm<ProfileFormType, any>({form: 'ProfileForm'})(ProfileForm)