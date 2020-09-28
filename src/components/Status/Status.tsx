import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {postDataType, SetStatusTC, UpdateStatusTC} from "../../Redux/postData-reducer";
import {EditableSpan} from "./EditableSpan";

type StatusType ={
    userId:number
}
export const Status = React.memo((props:StatusType)=>{
    console.log('status')
    const spanProps = useSelector<AppStateType, postDataType>(state => state.postData)
    const AllowStatusReading = useSelector<AppStateType, number|null>(state => state.auth.data.id)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(SetStatusTC(props.userId))
    },[props.userId])
   const updateStatus = useCallback((newText:string)=>{
        dispatch(UpdateStatusTC(newText))
    },[dispatch])
    return <EditableSpan statusIsFetching={spanProps.statusIsFetching}
                         status={spanProps.status}
                         updateStatus={updateStatus}
                         AllowStatusReading={AllowStatusReading}
                         UserId={props.userId}
    />

})