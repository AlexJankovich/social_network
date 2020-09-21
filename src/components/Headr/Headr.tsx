import React from 'react';
import './Headr.css';
import {NavLink} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";

type HeaderPropsType={
    isAuth:boolean
    login:string
    isFetching:boolean
}

export const Header = (props:HeaderPropsType) => {
    return (
        <header className='header'>

                <img src="http://images-on-off.com/images/125/samuraiputvoina-ccf2693f.jpg" alt=""/>

            <div className='loginBlock'>
                {props.isFetching?<div className='loginPreloader'><Preloader/></div>:null}
                {props.isAuth?
                    <div>{props.login}</div>:
                <NavLink to={'/login'}>Login</NavLink>
                    }
            </div>
        </header>
    )
}