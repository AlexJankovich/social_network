import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {AuthTC} from "../../Redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {requiredField} from "../../utils/validators/validators";
import {Input} from "../../common/FormsControls/FormsControls";
import {AppStateType} from "../../Redux/redux-store";
import { Redirect } from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    debugger
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input}
                       name={'email'}
                       placeholder={'email'}
                       validate={[requiredField]}
                       onBlur={(x:any)=>x}
                />
            </div>
            <div>
                <Field component={Input}
                       name={'password'}
                       placeholder={'password'}
                       validate={[requiredField]}
                       type={'password'}
                />
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

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = () => {
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
        <><h3>Login</h3>.
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}
