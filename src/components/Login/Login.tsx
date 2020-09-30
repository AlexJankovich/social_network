import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {AuthTC, authThunk} from "../../Redux/authReducer";
import {useDispatch} from "react-redux";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'} name={'email'} placeholder={'email'}/>
            </div>
            <div>
                <Field component={'input'} name={'password'} placeholder={'password'}/>
            </div>
            <div>
                <Field component={'input'} type={'checkbox'} name={'rememberMe'}/> remember Me
            </div>
            <div>
                <button>Login...</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<any, any>({form: 'login'})(LoginForm)

export const Login = () => {
    const dispatch = useDispatch()

    const onSubmit=(formData:FormDataType)=>{
        console.log(formData)
      dispatch(AuthTC(formData.email, formData.password, formData.rememberMe))
    }
    return (
        <><h3>Login</h3>.
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}