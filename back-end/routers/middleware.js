import { getAccountByToken } from '../mylib/crud/read'
import jwt from 'jsonwebtoken'
import { FOLDER } from '../mylib/constant'
export const authAccount = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)                

        var acc = await getAccountByToken(decoded.account_id, token)
        
        if (!acc) throw new Error()
        delete acc.password        
        const mappingProfileAvatar = {
            ...acc,
            avatar: FOLDER.IMAGES + acc.avatar
        }
        req.profile = mappingProfileAvatar
        // console.log(req.profile)
        
        next()
    } catch (error) {
        console.log('auth', error)
        res.status(400).json({
            profile: null
        })
    }
}