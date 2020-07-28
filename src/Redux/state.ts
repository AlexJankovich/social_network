export type postDataType = {
    id: string,
    name: string,
    message: string,
    time: string,
    isRead: boolean
}
export type dialogsDataType = {
    id: string,
    name: string
}
export type messageDataType = {
    id: string,
    message: string
}
export type stateType = {
    postData: Array<postDataType>
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>
    newMessageData: string
}

export  type StoreType = {
    _state: stateType
    getState: () => stateType,
    _rerenderDom: () => void
    // addPost: () => void
    // writePost: (newText: string) => void
    subscribe: (observer: () => void) => void
    dispatch:(action:AddPostActionType | WritePost)=>void
}

export type AddPostActionType={
    type:'ADD-POST'
}
export type WritePost={
    type:'WRITE-POST'
    newText: string
}
let store: StoreType = {
    _state: {
        newMessageData: '',
        postData: [
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
        dialogsData: [
            {id: '1', name: 'name1'},
            {id: '2', name: 'name2'},
            {id: '3', name: 'name3'},
            {id: '4', name: 'name4'},
            {id: '5', name: 'name5'},
            {id: '6', name: 'name6'},
        ],
        messageData: [
            {id: '1', message: 'message1'},
            {id: '2', message: 'message2'},
            {id: '3', message: 'message3'},
            {id: '4', message: 'message4'},
            {id: '5', message: 'message5'},
            {id: '6', message: 'message6'},
        ]
    },
    _rerenderDom() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },

    // addPost() {
    //
    // },
    // writePost(newText) {
    //
    // },
    subscribe(observer) {
        this._rerenderDom = observer
    },

    dispatch(action){
            if(action.type==='ADD-POST'){
                let NewPost = {
                    id: '6',
                    name: 'someName',
                    message: this._state.newMessageData,
                    time: new Date().toTimeString().slice(0, 5),
                    isRead: false
                };
                this._state.postData.push(NewPost)
                this._state.newMessageData = ''
                this._rerenderDom()
            }else if (action.type==='WRITE-POST'){
                this._state.newMessageData = action.newText
                this._rerenderDom()
            }
    }
}


export default store;
