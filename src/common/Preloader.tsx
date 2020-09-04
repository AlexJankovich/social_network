import loader from "../assets/images/loading.gif";
import React from "react";

export const Preloader=()=> {
    return <div className='preloader'>
        <img src={loader} alt="loading"/>
    </div>
}