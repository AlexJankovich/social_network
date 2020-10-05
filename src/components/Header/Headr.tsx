import React from 'react';
import s from './Headr.module.css';
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
            <img className={s.logo} src="http://images-on-off.com/images/125/samuraiputvoina-ccf2693f.jpg" alt=""/>
            <div className={s.loginBlock}>
                {props.isFetching ? <div className='loginPreloader'><Preloader/></div> : null}
                {/*{true?<div className={s.loginPreloader}><Preloader/></div>:null}*/}
                {props.isAuth ?
                    <>
                        <div>{props.login}</div>
                        <button onClick={props.Logout}>Logout</button>
                    </> :
                    <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}