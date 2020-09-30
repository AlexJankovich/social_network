import {connect} from "react-redux";
import {AddMessageAC} from "../../Redux/message-reducer";
import { Message } from "./message";
import Dialogs from "./dialogs";
import {AppStateType} from "../../Redux/redux-store";

const mapStateToProps1 = (state: any) => {
    return {
        dialogs: state.dialogsData.dialogs
    }
}
const mapStateToProps2 = (state: AppStateType) => {
    return {
        messages: state.messageData.messages,
    }
}

export const DialogContainer1 = connect(mapStateToProps1)(Dialogs)
export const MessagesContainer2 = connect(mapStateToProps2, {AddMessageAC})(Message)





