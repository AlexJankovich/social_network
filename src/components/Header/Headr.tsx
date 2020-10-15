import React from 'react';
import s from './Headr.module.scss';
import {NavLink} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";

type HeaderPropsType = {
    isAuth: boolean
    login: string
    isFetching: boolean
    Logout:()=>void
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                {props.isFetching? <div className={s.loginPreloader}><Preloader/></div> : null}
                {/*{true?<div className={s.loginPreloader}><Preloader/></div>:null}*/}
                {props.isAuth ?
                    <>
                        {props.login}
                        <button onClick={props.Logout}>Logout</button>
                    </> :
                    <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}