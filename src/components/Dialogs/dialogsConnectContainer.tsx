import React from "react";
import {DialogContainer1, MessagesContainer2} from "./dialogsContainer";
import s from './dialogs.module.css'
import {AuthRedirect} from "../../hoc/AuthRedirect";

export const DialogsConnectContainer =  AuthRedirect(() => {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <DialogContainer1/>
            </div>
            <div>
                <MessagesContainer2/>
            </div>
        </div>
    )
})