import s from "./message.module.css";
import React, {ChangeEvent} from "react";
import {messagesType} from "../../Redux/message-reducer";

type MessageType = {
    messages: Array<messagesType>
    AddMessage: () => void
    onChangeMassageHandler: (message: string) => void
    onChangeMessageData: string
}

export const Message = (props: MessageType) => {
    const AddMessage = () => {
        props.AddMessage()
    }
    let onChangeMassageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeMassageHandler(e.currentTarget.value)
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
        <div>
            <textarea value={props.onChangeMessageData}
                      onChange={onChangeMassageHandler}
                      placeholder='write message'
            >x</textarea>
        </div>
        <button onClick={AddMessage}>add massage</button>
    </div>


}