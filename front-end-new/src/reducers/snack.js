import {ACTION} from '../mylib/constant/constStr'
export const defaultSnack = {
    message: '',
    status: '',
    open: false,
}

export const snackReducer = (state, action) => {
    switch (action.type) {
        case ACTION.SET_SNACK: return {
            ...action.data,
            open : true
        }
        case ACTION.DISABLE_SNACK : return {
            ...state,
            open : false
        }
        default : return state
    }
}