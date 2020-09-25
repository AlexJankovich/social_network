import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "../components/Users/users.module.css";

type SliderPropsType = {
    totalUserCount: number
    pageSize: number
    startPagesCount: number
    pagesNumberCount: number
    isFetching: boolean
    currentPage: number
    nextPageList: (pagesCount: number) => void//к следующему списку страниц
    prevPage: () => void//к предидущему списку страниц
    toAndPage: (pagesCount: number) => void//в конец списка
    toStartPage: () => void//в начало списка
    onPageChange: (pageNumber: number) => void//загрузка текущей страницы
    toPageNumber: (newPage: number, pagesCount:number) => void
}

export const Slider = (props: SliderPropsType) => {
    const [newPage, setNewPage] = useState<number | string>('')
    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
    let pages: Array<number> = [];
    for (
        let i = props.startPagesCount;
        i <= (props.startPagesCount + props.pagesNumberCount);
        i++
    ) {
        pages.push(i)
    }
    const listUpp = () => {
        props.nextPageList(pagesCount)
    }
    const toStartPage = () => {
        props.toStartPage()
        props.onPageChange(1)
    }
    const toEndPage = () => {
        props.toAndPage(pagesCount)
        props.onPageChange(pagesCount)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < 1 || +e.currentTarget.value > pagesCount) {
            setNewPage('нет такой страницы')
        } else {
            setNewPage(+e.target.value)
        }
    }
    const goToPageNumber = () => {
        props.toPageNumber(newPage as number, pagesCount)
        setNewPage('')
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            goToPageNumber()
        }
    }
    return <div className={styles.pageListWrapper}>
        <button
            onClick={() => toStartPage()}
            disabled={props.isFetching}
        >
            {"<<"}
        </button>
        <button
            onClick={props.prevPage}
            disabled={props.isFetching}
        >
            {'<'}
        </button>
        {pages.map(p => <span
            className={props.currentPage === p ? styles.active : styles.hover}
            onClick={() => props.onPageChange(p)}
            key={p}
        >
                    {p} </span>)}

        <button
            onClick={listUpp}
            disabled={props.isFetching}
        >
            {">"}
        </button>
        <button
            disabled={props.isFetching}
            onClick={() => toEndPage()}
        >
            {">>"}
        </button>
        <input type='number'
               placeholder='№'
               onChange={onChange}
               value={newPage == null ? '' : newPage}
               className={styles.input}
               onKeyPress={onKeyPress}
               disabled={props.isFetching}
        />
        <button onClick={goToPageNumber}
                disabled={props.isFetching}
        >Go</button>
    </div>
};