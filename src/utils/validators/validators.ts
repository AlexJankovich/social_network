import {Validator} from "redux-form";

export const requiredField:Validator = (value) => {
    if (value) {
        return undefined
    }
    return "Field is required"
}

export const MaxLengthCreator = (maxLength: number):Validator => (value) => {
    if (value&&value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined
}

// export const maxLength30 = (value: any) => {
//     if (value && value.length > 30) {
//         return 'Max length is 30 symbols'
//     }
//     ;
//     return undefined
// }