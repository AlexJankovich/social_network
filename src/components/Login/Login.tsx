import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {AuthTC} from "../../Redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {requiredField} from "../../utils/validators/validators";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {AppStateType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";
import s from './Login.module.scss'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const checkBoxStyle = {
    width: " 20px"
}

type FormDataPropsType = {
    captcha: string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, FormDataPropsType> & FormDataPropsType> = React.memo((props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField(
                        'email',
                        'email',
                        [requiredField],
                        Input,
                        'text'
                    )}
                </div>
                <div>
                    {createField(
                        'password',
                        'password',
                        [requiredField],
                        Input,
                        'password'
                    )}
                </div>
                <div>
                    {props.error}
                </div>
                <div>
                    <Field component={'input'}
                           type={'checkbox'}
                           name={'rememberMe'}
                           style={checkBoxStyle}
                    />
                    remember Me
                </div>
                <div>
                    {props.captcha ?
                        createField(
                            'input captcha',
                            'captcha',
                            [requiredField],
                            Input,
                            'text')
                        : null}
                    {props.captcha ? <img src={props.captcha}/> : null}
                </div>
                <div>
                    <button>Login...</button>
                </div>
            </form>
        </div>
    )
})


const LoginReduxForm = reduxForm<FormDataType, FormDataPropsType>({form: 'login'})(LoginForm)


export const Login = React.memo(() => {

    const dispatch = useDispatch()

    const isAuth = useSelector<AppStateType, boolean>((state) => state.auth.isAuth)

    const captcha = useSelector<AppStateType, string>(state => state.auth.CaptchaURL)

    const onSubmit = (formData: FormDataType) => {
        if (captcha !== '') {
            dispatch(AuthTC(formData.email, formData.password, formData.rememberMe, formData.captcha))
        } else {
            dispatch(AuthTC(formData.email, formData.password, formData.rememberMe))
        }
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.loginWrapper}>
            <h2>Login</h2>
            <LoginReduxForm
                onSubmit={onSubmit}
                captcha={captcha}
            />
        </div>
    )
})
