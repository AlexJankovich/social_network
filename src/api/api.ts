import axios from "axios";


const instance = axios.create(
    {
        withCredentials:true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {'API-KEY': '0ef6ceb4-8351-4f10-830f-7860bde0de05'}
    }
);

export const GetUsers = (currentPage: number = 1, pageSize: number = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response=>response.data)
}

export const GetProfileInfo = (id:number)=>{
return instance.get(`profile/${id}`).then(response=> response.data)
}

export const FollowToApi =(id:number)=>{
    return instance.post(`follow/${id}`).then(response=>response.data)
}

export const unFollowToApi =(id:number)=>{
    return instance.delete(`follow/${id}`).then(response=>response.data)
}

export const GetAuth =()=>{
    return instance.get(`auth/me`).then(response=>response.data)
}