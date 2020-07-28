import s from "./Post.module.css";
import React from "react";
import {postDataType} from "../../../../Redux/state";

const Post = (props:postDataType) => {
    return (
        <div key={props.id}
            className={props.isRead ? s.wrapper__inner : s.wrapper__inner_dark}>
            <div className={s.wrapper__ava}>
                <img
                    src="http://fushigi-chikara.jp/wp-content/uploads/2017/11/687028-225x3001-150x150.jpg"
                     alt=""/>
            </div>
            <div className={s.wrapper__message}>
                <div className={s.message_item}>
                    <div className={s.name}>
                        {props.name}
                    </div>
                    <div className={s.post}>
                        {props.message}
                    </div>
                </div>
                <div className={s.message_time}>
                    {props.time}
                </div>
            </div>
        </div>
    );
}

export default Post;