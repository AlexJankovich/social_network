import React from "react";
import s from './dialogs.module.css';
import {dialogsType} from "../../Redux/store";
import {NavLink} from "react-router-dom";

type DialogsType = {
    dialogs: Array<dialogsType>
}
const Dialogs = (props: DialogsType) => {
    let Dialog = props.dialogs.map((d) =>
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
        </div>
    )
}

export default Dialogs;



