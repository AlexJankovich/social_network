import React from 'react';
import './App.css';
import {Header} from "./components/Headr/Headr";
import {NavBar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/dialogs";
import {BrowserRouter, Route} from "react-router-dom";
// import {StoreType} from "./Redux/store";

type AppStoreType = {
    store: any
}

const App: React.FC<AppStoreType> = (props) => {
    let state = props.store.getState()
    debugger
    debugger
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs'
                           render={() =>
                               <Dialogs
                                   onChangeMessageData={state.messageData.onChangeMessageData}
                                   dispatch={props.store.dispatch.bind(props.store)}
                                   dialogs={state.dialogsData.dialogs}
                                   messages={state.messageData.messages}
                               />}
                    />
                    <Route path='/Profile'
                           render={() =>
                               <Profile
                                   postData={state.postData.post}
                                   dispatch={props.store.dispatch.bind(props.store)}
                                   newMessageData={state.postData.newMessageData}
                               />}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
