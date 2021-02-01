import React, {useEffect, useState} from "react"

const WS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type ChatMessageType = {

    message: string
    photo: string
    userId: number
    userName: string

}

export const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        WS.addEventListener('message', (e) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        })
    }, [setMessages])

    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages.map((m, index) => {
                return <OneMessage message={m} key={index}/>
            })}
        </div>
    )
}

const OneMessage: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img src={message.photo} alt="" style={{width: '30px'}}/>
            <b>{message.userName}</b>
            <br/>
            <div>{message.message}</div>
            <hr/>
        </div>
    )
}

const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        WS.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}>

                </textarea>
            </div>
            <button onClick={sendMessageHandler}>Sent</button>
        </div>
    )
}