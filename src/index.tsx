import * as serviceWorker from './serviceWorker';
import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';


ReactDOM.render(
    <React.StrictMode>

        <Provider store={store}>
            <App/>
        </Provider>
        
    </React.StrictMode>,
    document.getElementById('root')
);

// let rerenderEntireTree = () => {
//     ReactDOM.render(
//         <React.StrictMode>
//             <Provider store={store}>
//             <App/>
//             </Provider>
//         </React.StrictMode>,
//         document.getElementById('root')
//     );
// }
// rerenderEntireTree()
// store.subscribe(rerenderEntireTree)

/*
let rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider><App store={store}/></Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree()
store.subscribe(rerenderEntireTree)
*/




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


