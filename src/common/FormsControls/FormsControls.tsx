import React, {ComponentType} from "react";
import {WrappedFieldMetaProps, WrappedFieldProps, Field, Validator} from "redux-form";

type FormControlType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlType> = ({children,meta,...props}) => {
    return (
        <div>
            {children}
            {meta.touched && meta.error ? <span>{meta.error}</span> : null}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = ({input,meta,...props}) => {
    return <FormControl meta={meta}>
        <textarea {...props} {...input}/>
    </FormControl>

}

export const Input: React.FC<WrappedFieldProps> = ({input,meta,...props}) => {
    return (
        <FormControl meta={meta}>
            <input {...input} {...props}/>
        </FormControl>
    )
}

export function createField<KeysType extends string> (
    placeholder:string,
    name:KeysType,
    Validators:Validator|Validator[],
    component:ComponentType<WrappedFieldProps> | "input" | "select" | "textarea",
    type:string) {
   return <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={Validators}
            component={component}
            type={type}
        />
    </div>
}

