import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.scss";
import {profileUsersType} from "../../../../Redux/postData-reducer";
import avaDefault from "../../../../assets/images/avaSamuray.jpg";

import {Status} from "../../../Status/Status";
import {Preloader} from "../../../../common/preloader/Preloader";

type ProfileInfoType = {
    profile: profileUsersType | null
    meId:number
    SavePhoto:(file:File)=>void
    uploadPhotoIsFetching: boolean
}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile){
        return <>
            no data
        </>
    }
    let image
    if (!props.profile?.photos===null || !props.profile.photos.large||!props.profile.photos.small) {
      image= avaDefault  }
    else {image=props.profile.photos.large}


    const upLoadImage =(e:ChangeEvent<HTMLInputElement>)=> {
       if(e.target.files?.length){
           props.SavePhoto(e.target.files[0])
       }
    }
    return (<>
            {/*{ !props.profile? <div>loading</div>:null}*/}
            <div className={s.name}>
                <span>{props.profile.fullName}</span>
                {props.meId === props.profile.userId&&
                <div>
                    {props.uploadPhotoIsFetching&&<Preloader/>}
                    <input type={'file'} onChange={upLoadImage}></input>
                    {/*<button onClick={upLoadImage}></button>*/}
                </div>}
            </div>
            <div className={s.contentWrapper}>
                <div className={s.avaWrapper}>
                    <div className={s.ava}>
                        <img src={image}
                             alt="ava"/>
                    </div>
                </div>
                <div>
                    <h3>Контакты:</h3>
                    <div className={s.contactWrapper}>
                        <div className={s.contactName}>{
                            Object.keys(props.profile.contacts).map((u,i) => {
                                return <div key={i}>{u + ":"}</div>
                            })
                        }</div>
                        <div className={s.contactLink}>{
                            Object.values(props.profile.contacts).map((u ,i)=> {
                                return <div key={i}><a href={u ? u : '#'}>{u ? u : 'none'}</a></div>
                            })
                        }</div>

                    </div>
                    <div className={s.aboutJob}>
                        <div><span>lookingForAJob: </span>{props.profile?.lookingForAJob ? 'Yes' : 'Nou'}</div>
                        <div><span>AboutJobsSkills: </span>{props.profile?.lookingForAJobDescription}</div>
                    </div>
                </div>
            </div>
            <hr/>
            <div>
                <Status userId={props.profile.userId}/>
            </div>
            <hr/>
        </>
    )
}