import React, {ReactNode} from "react";
import Dialogs from "./dialogs";
import {AddMessageAC, OnChangeMessageAC} from "../../Redux/message-reducer";
import {Message} from "./message";

type DialogsContainerType = {
    store:any
}

export const DialogsContainer: React.FC<DialogsContainerType> = (props) => {
    const AddMessage = () => {
        props.store.dispatch(AddMessageAC())
    }
    let onChangeMassageHandler = (message: string) => {
        props.store.dispatch(OnChangeMessageAC(message))
    }

        return (
            <>
                <Dialogs dialogs={props.store.getState().dialogsData.dialogs}/>
                <Message messages={props.store.getState().messageData.messages}
                         AddMessage={AddMessage}
                         onChangeMassageHandler={onChangeMassageHandler}
                         onChangeMessageData={props.store.getState().messageData.onChangeMessageData}/>
            </>

        )
    }






