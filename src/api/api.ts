import axios from "axios";
import {profileUsersType} from "../Redux/postData-reducer";

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {'API-KEY': process.env.REACT_APP_API_KEY}
    }
);

//`https://social-network.samuraijs.com/api/1.0/profile/status/2`
//`https://social-network.samuraijs.com/api/1.0/security/get-captcha-url`

export const UserAPI = {
    GetUsers: (currentPage: number = 1, pageSize: number = 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    FollowToApi: (id: number) => {
        return instance.post(`follow/${id}`).then(response => response.data)
    },
    unFollowToApi: (id: number) => {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}

type ResponseStatusType = {
    resultCode: number
    messages: [string],
    data: {},
}
type ResponsePhotoType = {
    resultCode: number
    messages: [string],
    data: {
        photos: {
            small: string | null
            large: string | null
        }
    }
}


export const ProfileAPI = {
    GetProfileInfo: (id: number) => {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    GetProfileStatus: (id: number) => {
        return instance.get(`profile/status/${id}`)
    },
    UpdateStatus: (newText: string) => {
        return instance.put<ResponseStatusType>(`profile/status/`, {status: newText}).then(res => res.data)
    },
    SavePhoto: (photo: File) => {
        let formData = new FormData()
        formData.append("image", photo)
        return instance.put<ResponsePhotoType>("profile/photo", formData, {
            headers: {"Content-Type": "multipart/form-data"}
        }).then(res => res.data)
    },
    SaveProfileInfo:(data:profileUsersType)=>{
       return instance.put<ResponseStatusType>( 'profile', data).then(res=>res.data)
    }
}

type LoginResType = {
    resultCode: number
    messages: [string],
    data: {
        userId: number
    }
}

export const SignIn = {
    GetAuth: () => {
        return instance.get(`auth/me`).then(response => response.data)
    },

    Authorisation: (login: string, password: string, rememberMe: boolean) => {
        return instance.post<LoginResType>('auth/login', {email: login, password: password, rememberMe: rememberMe})
            .then((res) => {
                console.log(res.data.resultCode)
                return res.data
            })
    },

    Logout: () => {
        return instance.post('auth/logout', {})
            .then((res) => {
                return res.data
            })
    }

}
