import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Login} from "../components/Login/Login";
import {Provider} from "react-redux";
import store from "../Redux/redux-store";

export default {
    title: 'Social/Login',
    component: Login,
} as Meta;

export const LoginStories = () =>{
    return (
        <Provider store={store}><Login/></Provider>
    )
}