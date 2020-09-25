import loader from "../../assets/images/loading.gif";
import React from "react";
import s from './Preloader.module.css'

export const Preloader=()=> {
    return<img  src={loader} alt="loading"/>
}