import React from "react";
import {Redirect} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

const MapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
// export const AuthRedirect = (Component:any) => {
//     class RedirectComp extends React.Component<any>{
//         render(){
//             if (!this.props.isAuth) return <Redirect to='/login'/>
//             return <Component {...this.props} />;
//         }
//     }

// const RedirectComp = (props:ReturnType<typeof Component>)=> {
//     if (!props.isAuth) return <Redirect to='/login'/>
//     return <Component {...props} />;
// }
//     const AuthRedirectComp1 = connect(MapStateToPropsForRedirect)(RedirectComp)
//     return AuthRedirectComp1
// }

export const AuthRedirect = (Component: any)=> {

    // const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const RedirectComp = (props:any) => {

        const StateProps = useSelector<AppStateType>(state => state.auth.isAuth)
        if (!StateProps) return <Redirect to='/login'/>
        return <Component {...props}/>;
    }
    return RedirectComp
}
