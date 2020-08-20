import React from "react";
import s from './dialogs.module.css';

import {NavLink} from "react-router-dom";
import {dialogsType} from "../../Redux/dialogs-reducer";

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
        <div>
            <div >
                {Dialog}
            </div>
        </div>
    )
}

export default Dialogs;



