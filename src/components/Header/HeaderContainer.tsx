import React from "react";
import {Header} from "./Headr";
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {authThunk, Logout} from "../../Redux/authReducer";

type HeaderContainerType = {
    isAuth:boolean
    login:string
    isFetching:boolean
    authThunk:()=>void
    Logout:()=>void
}

class HeaderClass extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.authThunk()
    }
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.data.login,
        isFetching:state.auth.isFetching
    }
}

export const HeaderContainer = connect(mapStateToProps, {authThunk,Logout})(HeaderClass);