import React from "react";
import s from "./ProfileInfo.module.css";

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://i.pinimg.com/736x/4b/04/4a/4b044a4bbf77f0f893da0edcfa2f9390--outdoors-lakes.jpg"
                     alt=""/>
            </div>
            <div className={s.ava}>
                <img src="https://i.ytimg.com/vi/Hy-PDyEfL-I/hqdefault.jpg" alt=""/>
            </div>
        </div>
    )
}