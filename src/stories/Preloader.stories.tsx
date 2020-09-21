import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import s from './preloader.module.css'
import {Preloader} from "../common/preloader/Preloader";

export default {
    title: 'Social/Preloader',
    component: Preloader,
} as Meta;

export const PreloaderStories = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.lorem}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur eius eveniet harum itaque
                laborum maiores nostrum odit repudiandae vitae. Dolor ex magnam minima sint tenetur? Excepturi
                exercitationem itaque saepe.
            </div>
            <div className={s.preloader}>
                <Preloader/>
            </div>
        </div>
    )
}
