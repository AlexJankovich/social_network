import React from 'react';
import './App.css';
import {Header} from "./components/Headr/Headr";
import {NavBar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {StoreType} from "./Redux/state";

type AppStoreType = {
   store:StoreType
}

const App:React.FC<AppStoreType> = (props) => {
    let state = props.store.getState()
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs'
                           render={()=>
                               <Dialogs
                                  dialogs={state.dialogsData}
                                  messages={state.messageData}
                               />}/>
                    <Route path='/Profile'
                           render={()=>
                               <Profile
                               postData={state.postData}
                               dispatch={props.store.dispatch.bind(props.store)}
                               newMessageData={state.newMessageData}
                               />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
