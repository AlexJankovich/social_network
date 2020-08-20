import React from 'react';
import './App.css';
import {Header} from "./components/Headr/Headr";
import {NavBar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsConnectContainer} from "./components/Dialogs/dialogsConnectContainer";



// type AppStoreType = {
//     store: any
// }

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs'
                           render={() =>
                               <DialogsConnectContainer/>
                           }
                    />
                    <Route path='/Profile'
                           render={() =>
                               <Profile/>}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}
// const App = (props:AppStoreType) => {
//     debugger
//     return (
//         <BrowserRouter>
//             <div className="app-wrapper">
//                 <Header/>
//                 <NavBar/>
//                 <div className='appWrapperContent'>
//                     <Route path='/Dialogs'
//                            render={() => <DialogsContainer store={props.store}/>}
//                     />
//                     <Route path='/Profile'
//                            render={() =>
//                                <Profile store={props.store}/>}
//                     />
//                 </div>
//             </div>
//         </BrowserRouter>
//     );
// }
export default App;
