import s from "./message.module.css";
import React from "react";
import {messageDataType} from "../../Redux/state";

type MessageType = {
    messageData: Array<messageDataType>
}

export const Message = (props: MessageType) => {
    let addNewMessage = React.createRef<HTMLTextAreaElement>()
    const AddMessage =() =>{
        let text = addNewMessage.current?.value
        alert (text)
    }
    let mapMessages = props.messageData.map(m =>
        <div key={m.id} className={s.message}>
            <span>{m.message}</span>
        </div>)

    return <div>{mapMessages}
        <div>
            <textarea ref={addNewMessage}></textarea>
        </div>
        <button onClick={AddMessage}>add massage</button>
    </div>


}