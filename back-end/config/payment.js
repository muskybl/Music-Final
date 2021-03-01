// key : music
//api key: cSFMFsHfA8DK2cNH72KZTJUrO9Y1sDRD
//secret: 2stgyudZN2jy2UXc8YbLpMwKdwYl7fVg
//TBkekIzxY1y0YxjubhdJI1mVjGqs2CsR
//8bNTNQe8PbCWUsAzFo9Y8cB0Af6BdNji
// 123.21.109.112
// dt :  171.253.5.94
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch'
import uniqid from 'uniqid'
import jwt from 'jsonwebtoken'
import FormData from 'form-data'
import moment from 'moment'
import { HOST } from '../mylib/constant'

const baokimUrl = 'https://api.baokim.vn/payment/api/v4'

const getKey = (apiKey, secret) => {
    const now = Date.now()
    const key = jwt.sign({
        iat: Math.floor(now / 1000),
        iss: apiKey,
        jti: uuidv4(),
        nbf: now,
        exp: now + (50 * 1000),
        form_params: {}, //Request POST thi bo data vo
    }, secret, { algorithm: 'HS256' })

    return key
}
const createOrder = (token, { amount, description, url_success, mrc_order_id, url_detail, lang, customer_email, customer_name }) => {
    const form = new FormData()
    form.append("total_amount", amount)
    form.append("description", description)
    form.append("url_success", url_success)
    form.append("mrc_order_id", mrc_order_id)
    form.append("url_detail", url_detail)
    form.append("lang", lang)
    form.append("customer_email", customer_email)
    form.append("customer_name", customer_name)

    const res = fetch(`${baokimUrl}/order/send?jwt=${token}`, {
        method: 'POST',
        body: form,
    }).then(data => data.json())
    return res
}
const getOrderDetail = async (mrc_order_id) => {
    const res = await fetch(`${baokimUrl}/order/detail?mrc_order_id=${mrc_order_id}`).then(data => data.json())
    return res
}
const applyOrder = async ({ account_id, email, name }, month) => {
    const amount = month === 1 ? 10000 : month === 6 ? 20000 : 30000
    return await createOrder(getKey('TBkekIzxY1y0YxjubhdJI1mVjGqs2CsR', '8bNTNQe8PbCWUsAzFo9Y8cB0Af6BdNji'), {
        amount,
        description: `${account_id}:${uniqid()}`,
        mrc_order_id: `Payment for ${month} months, ${moment().format('MM-DD-YYYY hh:mm:ss')}`,
        url_success: `http://localhost:3000/pricing/${month}`,
        url_detail: 'http://localhost:8080/accounts/me/payment',
        lang: 'vi',
        customer_email: email,
        customer_name: name,
    })
}
export default {
    getKey,
    applyOrder,
    getOrderDetail
}
// senior
// c++ 
// fa.hcm@fsoft.com.vn
// export createBaokimOrder