import s from "./ProfileInfo.module.scss";
import React from "react";
import {profileUsersType} from "../../../../Redux/postData-reducer";

type ContactsProfileInfo = {
    profile: profileUsersType
    isEditMode:(value:boolean)=>void
    meId: number
}

export const ContactsProfileInfo = (props: ContactsProfileInfo) => {
    return (
        <div>
                <h3>Контакты:</h3>
                <div className={s.contactWrapper}>
                    <div className={s.contactName}>{
                        Object.keys(props.profile.contacts).map((u, i) => {
                            return <div key={i}>{u + ":"}</div>
                        })
                    }</div>
                    <div className={s.contactLink}>{
                        Object.values(props.profile.contacts).map((u, i) => {
                            return <div key={i}><a href={`https://${u}`}>{u ? u : 'none'}</a></div>
                        })
                    }</div>
                </div>
                <div className={s.aboutJob}>
                    <div><span>lookingForAJob: </span>{props.profile?.lookingForAJob ? 'Yes' : 'Nou'}</div>
                    <div><span>AboutJobsSkills: </span>{props.profile?.lookingForAJobDescription}</div>
                </div>
            {props.profile.userId === props.meId?
                <button onClick={() => props.isEditMode(true)}>Edit info</button>:
                null}
            </div>)
}



