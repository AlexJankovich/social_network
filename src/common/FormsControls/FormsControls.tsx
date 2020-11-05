import React from "react";
import {WrappedFieldMetaProps, WrappedFieldProps,Field} from "redux-form";

type FormControlType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlType> = (props) => {
    return (
        <div>
            {props.children}
            {props.meta.touched&&props.meta.error? <span>{props.meta.error}</span> : null}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    return <FormControl meta={props.meta}>
        <textarea {...props}  {...props.input}/>
        </FormControl>

}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    return (
        <FormControl {...props}>
            <input
                   {...props.input}
                   {...props}
            />
        </FormControl>
    )
}

export const createField= (props:WrappedFieldProps, component:any, validators:any, text:string)=>(
    <div>
       <Field
           placeholder={props.meta.form}
           name={props.input.name}
           validators={validators}
           component={component}
           {...props}
       />{text}
    </div>
)
