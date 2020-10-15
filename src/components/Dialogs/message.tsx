import s from "./message.module.css";
import React from "react";
import {messagesType} from "../../Redux/message-reducer";
import {reduxForm, Field, InjectedFormProps, reset, stopSubmit} from "redux-form";
import {TextArea} from "../../common/FormsControls/FormsControls";
import {MaxLengthCreator} from "../../utils/validators/validators";
import {useDispatch} from "react-redux";

type MessageType = {
    messages: Array<messagesType>
    AddMessageAC: (value:string) => void
}

export const Message = (props: MessageType) => {
    const dispatch=useDispatch()
    const addNewMessage =(values:AddMessageFormType)=>{
        if(!values.NewMessage) {
            dispatch(stopSubmit('DialogAddMassage', {NewMessage: 'Field is empty'}))
        }else {
            props.AddMessageAC(values.NewMessage)
            dispatch(reset('DialogAddMassage'))
        }
    }
    const mapMessages = props.messages.map(m =>
        <div key={m.id}
             className={s.message}>
            <span key={m.id}>{m.message}</span>
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

const MaxLength15 = MaxLengthCreator(15)

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea}
                       name={'NewMessage'}
                       placeholder='write message'
                       validate={[MaxLength15]}
                />
            </div>
            <button >send massage</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: 'DialogAddMassage'})(AddMessageForm)