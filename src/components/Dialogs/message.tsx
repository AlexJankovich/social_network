import s from "./message.module.css";
import React from "react";
import {messagesType} from "../../Redux/message-reducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";

type MessageType = {
    messages: Array<messagesType>
    AddMessageAC: (value:string) => void
}

export const Message = (props: MessageType) => {

    const addNewMessage =(values:AddMessageFormType)=>{
        props.AddMessageAC(values.NewMessage)
    }
    const mapMessages = props.messages.map(m =>
        <div key={m.id}
             className={s.message}>
            <span>{m.message}</span>
        </div>)

    return <div className={s.wrapperMessages}>
        <div className={s.messages}>
            {mapMessages}
        </div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
}

type AddMessageFormType = {
    NewMessage: string
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea'
                       name={'NewMessage'}
                       placeholder='write message'
                />
            </div>
            <button>send massage</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<any, any>({form: 'DialogAddMassage'})(AddMessageForm)