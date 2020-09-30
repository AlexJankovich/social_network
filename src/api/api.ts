import axios from "axios";


const instance = axios.create(
    {
        withCredentials:true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {'API-KEY': process.env.REACT_APP_API_KEY}
    }
);

//`https://social-network.samuraijs.com/api/1.0/profile/status/2`
//`https://social-network.samuraijs.com/api/1.0/security/get-captcha-url`

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
    data: {},
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

type LoginResType={
    resultCode: number
    messages: [string],
    data: {
        userId: number
    }
}

export const SignIn={
    GetAuth :()=>{
        return instance.get(`auth/me`).then(response=>response.data)
    },
    Authorisation:(login:string, password:string,rememberMe:boolean)=>{
        debugger
        return instance.post<LoginResType>('/auth/login', {email:login,password:password,rememberMe:rememberMe})
            .then((res) => {
                debugger
            console.log(res.data.resultCode)
                return res.data
        })
    }

}
