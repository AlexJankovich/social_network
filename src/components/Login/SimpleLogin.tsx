import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {AuthTC, authThunk} from "../../Redux/authReducer";
import {useDispatch} from "react-redux";
import {requiredField} from "../../utils/validators/validators";
import {MyInput} from "../../common/InputForms/Input";

// type FormDataType = {
//     email: string
//     password: string
//     rememberMe: boolean
// }
//
// const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field component={'input'}
//                        name={'email'}
//                        placeholder={'email'}
//                        validate={[requiredField]}
//                 />
//             </div>
//             <div>
//                 <Field component={'input'} name={'password'} placeholder={'password'}/>
//             </div>
//             <div>
//                 <Field component={'input'} type={'checkbox'} name={'rememberMe'}/> remember Me
//             </div>
//             <div>
//                 <button>Login...</button>
//             </div>
//         </form>
//     )
// }

// const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type SimpleLoginType = {
    type: 'text' | 'password'
    login: string
    password: string
    error: string | null
    loginHandler: (value: string) => void
    passwordHandler: (value: string) => void
}
export const SimpleLogin = (props: SimpleLoginType) => {

    return (
        <><h3>Login</h3>.
            <MyInput type={'text'} value={props.login} error={props.error}
                     onChange={props.loginHandler}/>
            <MyInput type={'password'} value={props.password} error={props.error}
                     onChange={props.loginHandler}/>

        </>
    )
}