import React from "react";
import {InjectedFormProps, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlType = {
 meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlType> = (props)=> {
    return (
        <div>
            {props.children}
            {props.meta.touched&&props.meta.error&&<span>{props.meta.error}</span>}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps>  = (props)=>{
    return <FormControl meta={props.meta}>
        <textarea {...props} {...props.meta} {...props.input}/>
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps>  = (props)=>{
    return (
        <FormControl meta={props.meta}>
            <input {...props} {...props.meta} {...props.input}/>
        </FormControl>
    )
}