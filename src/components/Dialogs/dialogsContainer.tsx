
import {connect} from "react-redux";
import {AddMessageAC, OnChangeMessageAC} from "../../Redux/message-reducer";
import { Message } from "./message";
import Dialogs from "./dialogs";


const mapStateToProps1 = (state: any) => {
    return {
        dialogs: state.dialogsData.dialogs
    }
}
const mapStateToProps2 = (state: any) => {
    return {
        messages: state.messageData.messages,
        onChangeMessageData: state.messageData.onChangeMessageData
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        AddMessage: () => {
            dispatch(AddMessageAC())
        },
        onChangeMassageHandler: (message: string) => {
            const action = dispatch(OnChangeMessageAC(message))
            dispatch(action)
        }
    }
}

export const DialogContainer1 = connect(mapStateToProps1)(Dialogs)
export const MessagesContainer2 = connect(mapStateToProps2, mapDispatchToProps)(Message)





