import React, { Component } from "react";
import {WrappedFieldMetaProps, WrappedFieldProps, Field, BaseFieldProps} from "redux-form";

type FormControlType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlType> = (props) => {
    return (
        <div>
            {props.children}
            {props.meta.touched && props.meta.error ? <span>{props.meta.error}</span> : null}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    return <FormControl meta={props.meta}>
        <textarea {...props} {...props.input}/>
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

export const createField = (
    placeholder:string,
    name:string,
    Validator:any,
    component:any,
    type:string) => <div>
    <Field
       placeholder={placeholder}
       name={name}
       validate={Validator}
       component={component}
       type={type}
    />
</div>

