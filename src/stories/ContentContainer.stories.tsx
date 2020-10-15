import React from 'react';
import {Meta} from "@storybook/react/types-6-0";
import {Users} from "../components/Users/Users";
import {action} from "@storybook/addon-actions";
import {BrowserRouter} from "react-router-dom";
import {UserDataType} from "../Redux/users-reduser";
import s from './ContentContainer.module.css'
import {Slider} from "../common/slider/Slider";

export default {
    title: 'Social/Container',
    component: Users,
} as Meta;


const fakeState: any = {
    users: [],
    pageSize: 5,
    totalUserCount: 18,
    currentPage: 1,
    pagesNumberCount: 10,
    startPagesCount: 1,
    isFetching: false,
    followInProgress: [1]
}

const newStateMaker = (newFakeState: any) => {
    debugger


    for (let i = 0; i < 11; i++) {
        const superUers = {
            id: i,
            name: `name${i}`,
            status: `status${i}`,
            location: {
                city: "city",
                country: "country"
            },
            followed: false,
            photos: {
                small: "null",
                large: "null"
            }
        }
        newFakeState.users = [...newFakeState.users, superUers]
    }
    return newFakeState
}
let newFakeState1 = newStateMaker(fakeState)

export const ContentContainer = () => {
    return (
        <BrowserRouter>
            <div className={s.wrapper}>
                {newFakeState1.users.length > newFakeState1.pagesNumberCount ?
                    <Slider totalUserCount={newFakeState1.totalUserCount}
                            pageSize={newFakeState1.pageSize}
                            startPagesCount={newFakeState1.startPagesCount}
                            pagesNumberCount={newFakeState1.pagesNumberCount}
                            isFetching={newFakeState1.isFetching}
                            currentPage={newFakeState1}
                            nextPageList={action('nextPageList')}
                            prevPage={action("prevPage")}
                            toAndPage={action("toAndPage")}
                            toStartPage={action("toStartPage")}
                            onPageChange={action('onPageChange')}
                            toPageNumber={action("toPageNumber")}/> : null}

                <Users users={newFakeState1.users}
                       isFetching={newFakeState1.isFetching}
                       followThunk={action('2')}
                       unfollowThunk={action('1')}
                       followInProgress={newFakeState1.followInProgress}/>
            </div>
        </BrowserRouter>)
}