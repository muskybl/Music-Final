import cookies from 'js-cookie'
import { METHOD } from '../constant/constStr'
export const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    secure: true,
    SameSite: 'none',
}


export const post = (bodyData) => {
    return {
        method: METHOD.POST,
        ...options,
        body: JSON.stringify(bodyData),
    }
}
export const get = () => {    
    return {
        method: METHOD.GET,
        ...options,
        headers: {
            ...options.headers,
            'Authorization': 'Bearer ' + cookies.get('token')
        },
        
    }
}

/**
 * 
 * @param {*} modifyMethod PUT - DELETE
 * @param {*} data {data : 123}
 */
export const modify = (modifyMethod, data = null) => {
    return {
        method: modifyMethod,
        ...options,
        headers: {
            ...options.headers,
            'Authorization': 'Bearer ' + cookies.get('token')
        },
        body: JSON.stringify(data)
    }
}