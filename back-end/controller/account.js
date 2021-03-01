
import {
    isFavAlbum, findByCredentials, getHashPassword

} from '../mylib/crud/read'
import { generateAuthToken, createAccount } from '../mylib/crud/create'
import uniqid from 'uniqid'
import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import bcrypt from 'bcrypt'
import { PICTURE, DATE_FORMAT, FOLDER, MYSQL_PROC } from '../mylib/constant'
import { callProc, getMonthsOrderPrices, addTime } from '../mylib/functions/supports'
import { MESSAGE } from '../mylib/constant'

export const signIn = async (req, res) => {
    const { email, password, isRemember } = req.body

    try {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(ip)

        const { hashPassword } = await getHashPassword(email)
        const isMatch = await bcrypt.compare(password, hashPassword)

        if (isMatch) {
            var acc = await findByCredentials(email)
            const token = generateAuthToken(acc.account_id, isRemember)
            const acc_id = acc.account_id
            // ! hide info
            delete acc.password
            delete acc.account_id

            const profile = {
                ...acc,
                avatar: FOLDER.IMAGES + acc.avatar,
            }

            res.cookie('token', token, { httpOnly: false })

            return res.end(JSON.stringify({
                profile,
                favAlbums: await callProc(MYSQL_PROC.GET_FAV_ALBUMS, [acc_id]),
                favPlaylists: await callProc(MYSQL_PROC.GET_FAV_PLAYLISTS, [acc_id]),
                favSongs: await callProc(MYSQL_PROC.GET_FAV_SONGS, [acc_id]),
                userPlaylists: await callProc(MYSQL_PROC.GET_USER_PLAYLISTS, [acc_id]),
                message: MESSAGE.SUCCESS_LOGIN
            }))
        }
        else {
            console.log('not match')
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: MESSAGE.FAIL_LOGIN
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: MESSAGE.FAIL_LOGIN
        })
    }
}

export const signUp = async (req, res) => {
    const acc_id = uniqid()
    const account = {
        account_id: acc_id,
        avatar: PICTURE.ACCOUNT,
        createdAt: moment().format(DATE_FORMAT),
        expiredDate: moment().format(DATE_FORMAT),
        role: 'user',
        ...req.body,
        password: await bcrypt.hash(req.body.password, 8)
    }
    try {
        const { isSuccess } = await createAccount(account)
        if (isSuccess) {
            const token = generateAuthToken(account.account_id, req.isRemember)
            // ! hide info
            delete account.password
            delete account.account_id

            const profile = {
                ...account,
                avatar: FOLDER.IMAGES + account.avatar,
            }

            res.cookie('token', token, { httpOnly: false })

            return res.end(JSON.stringify({
                profile,
                favAlbums: [],
                favPlaylists: [],
                favSongs: [],
                message: MESSAGE.REGISTER_OK,
                userPlaylists: []
            }))
        }
        else {
            return res.status(StatusCodes.CONFLICT).json({
                message: MESSAGE.INVALID_EMAIL
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: MESSAGE.INVALID_EMAIL
        })
    }
}
export const updateAccount = (req, res) => {

}

export const orderPaid = async (req, res) => {
    const total_amount = parseInt(req.body.total_amount)
    const months = getMonthsOrderPrices(total_amount)
    const account_id = req.profile.account_id
    const acc_expireDate = await callProc(MYSQL_PROC.GET_EXPIRED_DATE, [account_id])
    const longlastExpiredDate = addTime(moment(acc_expireDate[0].expiredDate), months, 'months')
    // update DB
    callProc(MYSQL_PROC.ORDER_PAID, [longlastExpiredDate, account_id]).then(res => res).catch(err => console.log(err))
    return res.status(StatusCodes.OK).json({
        message: 'Thank you, your payment was successfull',
        expiredDate: longlastExpiredDate
    })
}
export const responseIsFavAlbum = async (req, res) => {
    const { accountId, albumId } = req.params
    try {
        const isFav = await isFavAlbum(accountId, albumId)
        if (isFav) return res.status(StatusCodes.OK).json({ isFav: true })
        return res.status(StatusCodes.OK).json({ isFav: false })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const accountProfile = async (req, res) => {
    const { account_id } = req.profile

    delete req.profile.account_id

    res.status(StatusCodes.OK).json({
        profile: req.profile,
        favAlbums: await callProc(MYSQL_PROC.GET_FAV_ALBUMS, [account_id]),
        favPlaylists: await callProc(MYSQL_PROC.GET_FAV_PLAYLISTS, [account_id]),
        favSongs: await callProc(MYSQL_PROC.GET_FAV_SONGS, [account_id]),
        userPlaylists: await callProc(MYSQL_PROC.GET_USER_PLAYLISTS, [account_id]),
    })
}


export const allAccounts = async (req, res) => {
    try {
        const accounts = await callProc(MYSQL_PROC.GET_ALL_ACCOUNTS, [], true)
        // console.log(accounts)
        return res.status(StatusCodes.OK).json(accounts)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}
export default {
    allAccounts,
    signIn,
    signUp,
    responseIsFavAlbum,
    accountProfile,
    orderPaid
}
