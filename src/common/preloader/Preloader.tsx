import loader from "../../assets/images/loading.gif";
import React from "react";
import s from './Preloader.module.css'

export const Preloader=()=> {
    return<img className={s.Preloader} src={loader} alt="loading"/>
}