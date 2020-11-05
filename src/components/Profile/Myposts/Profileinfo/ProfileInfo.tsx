import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.scss";
import {profileUsersType} from "../../../../Redux/postData-reducer";
import avaDefault from "../../../../assets/images/avaSamuray.jpg";
import {Status} from "../../../Status/Status";
import {Preloader} from "../../../../common/preloader/Preloader";
import {ContactsProfileInfo} from "./ConactsAbdLinks";
import {ProfileReduxForm} from "./ProfileInfoForm";

type ProfileInfoType = {
    profile: profileUsersType | null
    meId: number
    SavePhoto: (file: File) => void
    uploadPhotoIsFetching: boolean
    SaveProfile: (data: profileUsersType) => Promise<void>
}

export const ProfileInfo = (props: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false)

    const isEditMode = () => {
        setEditMode(!editMode)
    }
    if (!props.profile) {
        return <>
            no data
        </>
    }
    let image
    if (!props.profile?.photos === null || !props.profile.photos.large || !props.profile.photos.small) {
        image = avaDefault
    } else {
        image = props.profile.photos.large
    }

    const upLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.SavePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: profileUsersType) => {
        props.SaveProfile(formData).then(()=>{
            setEditMode(false)
        })

    }

    return (<>
            {/*{ !props.profile? <div>loading</div>:null}*/}
            <div className={s.name}>
                <span>{props.profile.fullName}</span>
                {props.meId === props.profile.userId &&
                <div>
                    {props.uploadPhotoIsFetching && <Preloader/>}
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
                {
                    editMode ?
                        <ProfileReduxForm
                            onSubmit={onSubmit}
                            initialValues={props.profile}
                            profile={props.profile}
                        /> :
                        <ContactsProfileInfo
                            profile={props.profile}
                            isEditMode={isEditMode}
                            meId={props.meId}
                        />
                }
            </div>
            <hr/>
            <div>
                <Status userId={props.profile.userId}/>
            </div>
            <hr/>
        </>
    )
}