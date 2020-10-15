export type messagesType = { id: string, message: string }
export type messageDataType = {
    messages: Array<messagesType>
}

const initialState = {
        messages: [
            {id: '1', message: 'message1'},
            {id: '2', message: 'message2'},
            {id: '3', message: 'message3'},
            {id: '4', message: 'message4'},
            {id: '5', message: 'message5'},
            {id: '6', message: 'message6'},
        ],
}

type AddMessageActionType = {
    type: 'ADD-MESSAGE'
    NewMessage:string
}
type ActionType =  AddMessageActionType

export const messageReducer = (state:messageDataType=initialState, action:ActionType)=>{
    switch (action.type) {
        case "ADD-MESSAGE": {
            const NewMessage = {
                id: '99',
                message: action.NewMessage
            }
            return {...state,messages:[...state.messages,NewMessage],onChangeMessageData:''}
        }
        default:
            return state
    }
}
export const AddMessageAC = (NewMessage:string):AddMessageActionType => {
    return {type: "ADD-MESSAGE", NewMessage}
}

