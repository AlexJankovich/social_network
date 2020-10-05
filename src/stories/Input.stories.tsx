import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Login} from "../components/Login/Login";
import {Provider} from "react-redux";
import store from "../Redux/redux-store";
import {MyInput} from "../common/InputForms/Input";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Social/Input',
    component: Login,
} as Meta;

export const LoginStories = () => {
    return (
        <MyInput onChange={action('write symbol')}
                 value={'here must be my text'}
                 error={'error'}
                 type={'text'}
        />
    )
}