import React from 'react';
import './App.css';
import {NavBar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsConnectContainer} from "./components/Dialogs/dialogsConnectContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import { UsersHookContainer } from './components/Users/UsersHookContainer';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs'
                           render={() => <DialogsConnectContainer/>}/>
                    <Route path='/Profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/users'
                           render={() => <UsersHookContainer/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
