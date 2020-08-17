import {ActionType, AddMessageActionType, messageDataType, OnChangeMessageHandlerActionType} from "./store";

let initialState = {
        messages: [
            {id: '1', message: 'message1'},
            {id: '2', message: 'message2'},
            {id: '3', message: 'message3'},
            {id: '4', message: 'message4'},
            {id: '5', message: 'message5'},
            {id: '6', message: 'message6'},
        ],
        onChangeMessageData: '',
}

export const messageReducer = (state:messageDataType=initialState, action:ActionType)=>{
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
            return copyState
        }
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
