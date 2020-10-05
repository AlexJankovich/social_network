import React, {ChangeEvent} from "react";
import s from './MyInput.module.css'

type MyInputType = {
    type:string
    value:string
    error:string | null
    onChange:(newValue:string)=>void
}

export const MyInput = (props:MyInputType) =>{
    const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        props.onChange(e.currentTarget.value)
    }
    return(
        <div className={!props.error?s.InputWrapper:s.InputWrapper + ' '+ s.inputErrStyle}>
            <input type={props.type} value={props.value} onChange={onChange}/>
            {props.error?<span>{"<" + props.error}</span>:null}
        </div>
    )
}