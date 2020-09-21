import React from "react";
import {Redirect} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

const MapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth:state.auth.isAuth
})
export const AuthRedirect = (Component:any) => {

    const RedirectComp = (props:ReturnType<typeof Component>)=> {
        if (!props.isAuth) return <Redirect to='/login'/>
        return <Component {...props} />;
    }
    const AuthRedirectComp1 = connect(MapStateToPropsForRedirect)(RedirectComp)
    return AuthRedirectComp1
}


// export const AuthRedirect = (Component: any): any => {
//     const OwnStateProps = useSelector<AppStateType>(state => state.auth.isAuth)
// const CompProps = useSelector<AppStateType>(state => state)
//     const dispatch = useDispatch()
//     const RedirectComp = (): any => {
//         if (!OwnStateProps) return <Redirect to='/login'/>
//         return <Component {...CompProps} {...dispatch}/>;
//     }
// }
