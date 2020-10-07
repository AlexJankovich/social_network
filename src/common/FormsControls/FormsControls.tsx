import React from "react";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlType> = (props) => {
    const isError = () => {
        switch (true) {
            case props.meta.active:
                return true;
            case  props.meta.error&&props.meta.active&&props.meta.touched:
                return true
            default:
                return false
        }
    }

    return (
        <div>
            {props.children}
            {props.meta.error? <span>{props.meta.error}</span> : null}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    return <FormControl meta={props.meta}>
        <textarea {...props} {...props.meta} {...props.input}/>
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    return (
        <FormControl meta={props.meta}>
            <input {...props} {...props.meta} {...props.input}/>
        </FormControl>
    )
}