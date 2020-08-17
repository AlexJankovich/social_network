import {ActionType, postDataType, WritePostActionType} from "./store";

export const postReducer = (state:postDataType, action:ActionType)=> {
    switch (action.type) {
        case "ADD-POST": {
            const copyState = {...state}
            let NewPost = {
                id: '6',
                name: 'someName',
                message: copyState.newMessageData,
                time: new Date().toTimeString().slice(0, 5),
                isRead: false
            };
            copyState.post.push(NewPost)
            copyState.newMessageData = ''

            return copyState}
        case "WRITE-POST":
            const copyState = {...state}
            copyState.newMessageData = action.newText
            return copyState
        default:
            return state
    }
}
export const AddPostAC = (): ActionType => {
    return {type: "ADD-POST"}
}
export const WritePostAC = (newText: string): WritePostActionType => {
    return {type: "WRITE-POST", newText: newText}
}