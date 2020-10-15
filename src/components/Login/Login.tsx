import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {AuthTC} from "../../Redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {requiredField} from "../../utils/validators/validators";
import {Input} from "../../common/FormsControls/FormsControls";
import {AppStateType} from "../../Redux/redux-store";
import { Redirect } from "react-router-dom";
import s from './Login.module.scss'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const checkBoxStyle = {
    width :" 20px"
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = React.memo((props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input}
                           name={'email'}
                           placeholder={'email'}
                           validate={[requiredField]}
                           type={'text'}
                    />
                </div>
                <div >
                    <Field component={Input}
                           name={'password'}
                           placeholder={'password'}
                           validate={[requiredField]}
                           type={'password'}
                    />
                </div>
                <div>
                    {props.error}
                </div>
                <div >
                    <Field component={'input'}
                           type={'checkbox'}
                           name={'rememberMe'}
                           style={checkBoxStyle}
                    />
                    remember Me
                </div>
                <div>
                    <button>Login...</button>
                </div>
            </form>
        </div>
    )
})


const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


export const Login = React.memo(() => {

    const dispatch = useDispatch()

    const isAuth = useSelector<AppStateType>((state )=>state.auth.isAuth )

    const onSubmit=(formData:FormDataType)=>{
        debugger
        console.log(formData)
      dispatch(AuthTC(formData.email, formData.password, formData.rememberMe))
    }

    if (isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.loginWrapper}>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
})
