import {AddPostAC} from "../../../../Redux/postData-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";

const mapStateToProps = (state:AppStateType)=>{

    return{
        post: state.postData.post,
    }
}

export const MyPostsContainer = connect(mapStateToProps, {AddPostAC})(MyPosts)


