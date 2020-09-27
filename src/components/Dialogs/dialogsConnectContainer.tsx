import React from "react";
import {DialogContainer1, MessagesContainer2} from "./dialogsContainer";
import s from './dialogs.module.css'
import { Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {useSelector} from "react-redux";

export const DialogsConnectContainer = () => {
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth)
    if (!isAuth) {
        return <Redirect to='/login'/>
    }
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
}
// let AuthRedirectComp = (props:AppStateType)=>{
//     if(!props.auth.isAuth)return <Redirect to='/login'/>
//     return <DialogsConnectContainer />
// }