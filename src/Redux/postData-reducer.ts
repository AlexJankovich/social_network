type AddPostActionType = {
    type: 'ADD-POST'
}
type WritePostActionType = {
    type: 'WRITE-POST'
    newText: string
}

export type ActionType = AddPostActionType|WritePostActionType
export type postType = {
    id: string,
    name: string,
    message: string,
    time: string,
    isRead: boolean
}
export type postDataType = {
    post: Array<postType>
    newMessageData: string
}
const initialState = {
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
    newMessageData: ''
}
export const postReducer = (state: postDataType = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-POST": {
            let NewPost = {
                id: '6',
                name: 'someName',
                message: state.newMessageData,
                time: new Date().toTimeString().slice(0, 5),
                isRead: false
            };
            return {...state, post:[...state.post, NewPost], newMessageData:''}
        }
        case "WRITE-POST":
            return {...state,newMessageData: action.newText}
        default:
            return state
    }
}
export const AddPostAC = (): ActionType => {
    return {type: "ADD-POST"}
};
export const WritePostAC = (newText: string): WritePostActionType => {
    return {type: "WRITE-POST" , newText: newText}
};