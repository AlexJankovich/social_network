import React from "react";
import {ProfileInfo} from "./Myposts/Profileinfo/ProfileInfo";
import {MyPostsContainer} from "./Myposts/MyPostsContainer";
import { AppStateType } from "../../Redux/redux-store";

// type ProfileType = {
//   store:any
// }

// export const Profile = () => {
//     return (
//         <div>
//             <ProfileInfo/>
//             <MyPostsContainer/>
//         </div>
//     )
// }
export const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}