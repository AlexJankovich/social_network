import React from "react";
import s from "./ProfileInfo.module.css";
import { profileUsersType } from "../../../../Redux/postData-reducer";
import {Preloader} from "../../../../common/Preloader";

type ProfileInfoType={
    profile:profileUsersType|null
}

export const ProfileInfo = (props:ProfileInfoType) => {
    let image
    if(!props.profile){image=''}
    else if(props.profile.photos.large){
        image=props.profile.photos.large
    }else if(props.profile.photos.small){
        image=props.profile.photos.small
    }
    if(!props.profile){
        return <Preloader/>
    }
    return (

        <div>
            <div>
                <img src={image}
                     alt=""/>
                     {/*<img src="https://i.pinimg.com/736x/4b/04/4a/4b044a4bbf77f0f893da0edcfa2f9390--outdoors-lakes.jpg"*/}
                     {/*alt=""/>*/}
            </div>
            <div className={s.ava}>
                <img src="https://i.ytimg.com/vi/Hy-PDyEfL-I/hqdefault.jpg" alt=""/>
            </div>
        </div>
    )
}