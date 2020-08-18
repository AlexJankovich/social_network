import React from 'react';
import './App.css';
import {Header} from "./components/Headr/Headr";
import {NavBar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/dialogsContainer";


type AppStoreType = {
    store: any
}

const App: React.FC<AppStoreType> = (props) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='./components/Dialogs/dialogsContainer'
                           render={() => <DialogsContainer store={props.store}/>}
                    />
                    <Route path='/Profile'
                           render={() =>
                               <Profile store={props.store}/>}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
