import React from "react";
import axios from "axios";
import {Header} from "./Headr";
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {AuthIsFetching, AuthResponseType, AuthUser} from "../../Redux/authReducer";
import {GetAuth} from "../../api/api";

type HeaderContainerType = {
    isAuth:boolean
    login:string
    isFetching:boolean
    AuthIsFetching:(isFetching:boolean)=>void
    AuthUser: (data: AuthResponseType) => void
}

class HeaderClass extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.AuthIsFetching(true)
        GetAuth()
            .then(response => {
                if (response.resultCode === 0) {
                    this.props.AuthUser(response.data)
                }
                this.props.AuthIsFetching(false)
            });
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

export const HeaderContainer = connect(mapStateToProps, {AuthUser, AuthIsFetching})(HeaderClass);