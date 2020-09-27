import axios from "axios";


const instance = axios.create(
    {
        withCredentials:true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {'API-KEY': '0ef6ceb4-8351-4f10-830f-7860bde0de05'}
    }
);

//`https://social-network.samuraijs.com/api/1.0/profile/status/2`

export const UserAPI ={
    GetUsers:(currentPage: number = 1, pageSize: number = 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response=>response.data)
    },
    FollowToApi:(id:number)=>{
        return instance.post(`follow/${id}`).then(response=>response.data)
    },
    unFollowToApi :(id:number)=>{
        return instance.delete(`follow/${id}`).then(response=>response.data)
    }
}

type UpdateStatusType = {
    resultCode: number
    messages: [string],
    data: {}
}

export const ProfileAPI={
    GetProfileInfo:(id:number)=>{
        return instance.get(`profile/${id}`).then(response=> response.data)
    },
    GetProfileStatus:(id:number)=>{
        return instance.get(`profile/status/${id}`)
    },
    UpdateStatus :(newText:string)=>{
        return instance.put<UpdateStatusType>(`profile/status/`, {status:newText}).then(res=>res.data)
    }

}

export const GetAuth =()=>{
    return instance.get(`auth/me`).then(response=>response.data)
}