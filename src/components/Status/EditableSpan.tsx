import {Preloader} from "../../common/preloader/Preloader";
import React, {ChangeEvent, FocusEvent, useState} from "react";
import span from './EditableSpan.module.css'

type EditableSpanType = {
    statusIsFetching: boolean
    status: string
    updateStatus: (newText: string) => void
    AllowStatusReading:number|null
    UserId:number
}

export const EditableSpan =React.memo((props: EditableSpanType) => {
console.log('span')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.status)

    const OnEditMode = () => {
        if(props.AllowStatusReading===props.UserId) {
            setEditMode(true)
            setValue(props.status)
        }
    }
    const OffEditMode = (e: FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        props.updateStatus(e.currentTarget.value)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return <div className={span.container}>
        {props.statusIsFetching ? <div className={span.preloader}><Preloader/></div> : null}
        {/*{true ? <div className={span.preloader}><Preloader/></div> : null}*/}
        {editMode ?
            <input type="text"
                   onBlur={(e) => OffEditMode(e)}
                   autoFocus
                   onChange={onChange}
                   value={value}
            /> :
            <span onDoubleClick={OnEditMode}>Status:{props.status}</span>}
    </div>
})