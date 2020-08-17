import s from "./message.module.css";
import React, {ChangeEvent} from "react";
import {AddMessageAC, OnChangeMessageAC} from "../../Redux/message-reducer";
import {ActionType, messagesType} from "../../Redux/store";

type MessageType = {
    messages: Array<messagesType>
    dispatch:(action: ActionType)=>void
    onChangeMessageData:string
}

export const Message = (props: MessageType) => {
    const AddMessage = () =>{
        props.dispatch(AddMessageAC())
    }
    const mapMessages = props.messages.map(m =>
        <div key={m.id}
             className={s.message}>
            <span>{m.message}</span>
        </div>)
    const onChangeMassageHandler=(e: ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(OnChangeMessageAC(e.currentTarget.value))
    }

    return <div>{mapMessages}
        <div>
            <textarea  value={props.onChangeMessageData}
                       onChange={onChangeMassageHandler}></textarea>
        </div>
        <button onClick={AddMessage}>add massage</button>
    </div>


}