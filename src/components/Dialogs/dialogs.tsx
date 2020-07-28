import React from "react";
import s from './dialogs.module.css';
import {Message} from "./message";
import {dialogsDataType, messageDataType} from "../../Redux/state";
import {NavLink} from "react-router-dom";

type DialogsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
}
const Dialogs = (props: DialogsType) => {
    let Dialog = props.dialogs.map((d)=>
        <div key={d.id} className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + d.id}>
                {d.name}
            </NavLink>
        </div>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {Dialog}
            </div>
            <div className={s.messages}>
                <Message messageData={props.messages}/>
            </div>
        </div>
    )
}

export default Dialogs;



