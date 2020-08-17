import {ActionType, AddMessageActionType, messageDataType, OnChangeMessageHandlerActionType} from "./store";

export const messageReducer = (state:messageDataType, action:ActionType)=>{
    switch (action.type) {
        case "ADD-MESSAGE": {
            const copyState = {...state}
            const NewMessage = {
                id: '8',
                message: copyState.onChangeMessageData
            }
            copyState.messages.push(NewMessage)
            copyState.onChangeMessageData = ''
            return copyState
        }
        case "ON-CHANGE-MESSAGE": {
            const copyState = {...state}
            copyState.onChangeMessageData = action.message
            return copyState}
        default:
            return state

    }

}
export const AddMessageAC = ():AddMessageActionType => {
    return {type: "ADD-MESSAGE"}
}
export const OnChangeMessageAC = (message: string):OnChangeMessageHandlerActionType => {
    return {type: "ON-CHANGE-MESSAGE", message: message}
}
