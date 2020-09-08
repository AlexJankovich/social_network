import React from 'react';
import './App.css';
import {Header} from "./components/Headr/Headr";
import {NavBar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsConnectContainer} from "./components/Dialogs/dialogsConnectContainer";
import {UsersContainer} from "./components/Users/usersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Headr/HeaderContainer";

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
                           render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
