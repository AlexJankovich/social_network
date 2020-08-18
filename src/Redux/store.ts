import {postReducer} from "./postData-reducer";
import {messageReducer} from "./message-reducer";
import {dialogsReducer} from "./dialogs-reducer";

//action types
export type AddPostActionType = {
    type: 'ADD-POST'
}
export type WritePostActionType = {
    type: 'WRITE-POST'
    newText: string
}
export type OnChangeMessageHandlerActionType = {
    type: 'ON-CHANGE-MESSAGE'
    message: string
}
export type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}

// export type ActionType = ReturnType<typeof AddPostAC> |
//     ReturnType<typeof WritePostAC>  |
//     ReturnType<typeof OnChangeMessageAC>  |
//     ReturnType<typeof AddMessageAC> ;
export type ActionType = AddPostActionType |
    WritePostActionType |
    OnChangeMessageHandlerActionType |
    AddMessageActionType ;
//action types


//store types
export type postType = {
    id: string,
    name: string,
    message: string,
    time: string,
    isRead: boolean
}
export type messagesType = { id: string, message: string }
export type dialogsType = { id: string, name: string }
export type dialogsDataType = { dialogs:Array<dialogsType> }
export type messageDataType = {
    messages: Array<messagesType>
    onChangeMessageData: string
}
export type postDataType = {
    post: Array<postType>
    newMessageData: string
}
export type stateType = {
    postData: postDataType
    dialogsData: dialogsDataType
    messageData: messageDataType
}

export  type StoreType = {
    _state: stateType
    getState: () => stateType,
    _rerenderDom: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
}
//store types

//store
let store: StoreType = {
    _state: {
        postData: {
            post: [
                {
                    id: '1',
                    name: 'Артём',
                    message: 'У меня дыра в голове ',
                    time: '20:05',
                    isRead: true
                },
                {
                    id: '2',
                    name: 'Артём',
                    message: 'Уже две',
                    time: '20:10',
                    isRead: true
                },
                {
                    id: '3',
                    name: 'Артём',
                    message: 'Теперь в голове сквозняк',
                    time: '20:20',
                    isRead: true
                },
                {
                    id: '4',
                    name: 'Артём',
                    message: 'И сразу стало всё ништяк',
                    time: '20:30',
                    isRead: false
                },
                {
                    id: '5',
                    name: 'Артём',
                    message: '))))',
                    time: '20:35',
                    isRead: false
                },
            ],
            newMessageData: '',
        },
        dialogsData: {
            dialogs:[
            {id: '1', name: 'name1'},
            {id: '2', name: 'name2'},
            {id: '3', name: 'name3'},
            {id: '4', name: 'name4'},
            {id: '5', name: 'name5'},
            {id: '6', name: 'name6'},
        ]},
        messageData: {
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
    },
    _rerenderDom() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },

    subscribe(observer) {
        this._rerenderDom = observer
    },

    dispatch(action) {
        this._state.postData = postReducer(this._state.postData, action)
        this._state.messageData = messageReducer(this._state.messageData, action)
        this._state.dialogsData = dialogsReducer(this._state.dialogsData, action)
        this._rerenderDom();
    }
}

export default store;

