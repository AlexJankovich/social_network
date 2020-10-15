import React from "react";
import s from './Navbar.module.scss';
import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/Profile" activeClassName={s.active}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Dialogs" activeClassName={s.active}>
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Users" activeClassName={s.active}>
                    Users
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="#">
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="#">
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="#">
                    Setting
                </NavLink>
            </div>
        </nav>
    )
}