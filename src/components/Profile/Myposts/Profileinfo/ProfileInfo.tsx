import React from "react";
import s from "./ProfileInfo.module.css";
import {profileUsersType} from "../../../../Redux/postData-reducer";
import {Preloader} from "../../../../common/Preloader";

type ProfileInfoType = {
    profile: profileUsersType | null
}

export const ProfileInfo = (props: ProfileInfoType) => {
    let image
    if (!props.profile) {image = ''
    } else if (props.profile.photos.large) {image = props.profile.photos.large
    } else if (props.profile.photos.small) {image = props.profile.photos.small}
    if (!props.profile) {return <Preloader/>}

    return (<>
            <div className={s.name}><span>{props.profile.fullName}</span></div>
            <div className={s.contentWrapper}>
                <div className={s.avaWrapper}>
                    <div className={s.ava}>
                        <img src={image}
                             alt=""/>
                    </div>
                </div>
                <div>
                    <h3>Контакты:</h3>
                    <div className={s.contactWrapper}>

                        <div className={s.contactName}>{
                            Object.keys(props.profile.contacts).map(u=>{
                                return <div>{u + ":"}</div>
                            })
                        }</div>
                        <div className={s.contactLink}>{
                            Object.values(props.profile.contacts).map(u=>{
                                return <div><a href={u ? u : '#'}>{u ? u : 'none'}</a></div>
                            })
                        }</div>

                    </div>
                    <div className={s.aboutJob}>
                        <div><span>lookingForAJob: </span>{props.profile.lookingForAJob ? 'Yes' : 'Nou'}</div>
                        <div><span>AboutJobsSkills: </span>{props.profile.lookingForAJobDescription}</div>
                    </div>
                </div>
            </div>
        </>
    )
}