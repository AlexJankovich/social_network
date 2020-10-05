import React from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

export const AuthRedirect = (Component: any)=> {
    const RedirectComp = (props:any) => {

        const StateProps = useSelector<AppStateType>(state => state.auth.isAuth)
        if (!StateProps) return <Redirect to='/login'/>
        return <Component {...props}/>;
    }
    return RedirectComp
}
