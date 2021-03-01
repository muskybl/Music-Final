import insert from '../mylib/crud/insert'
import { StatusCodes } from 'http-status-codes'
import { TABLE, MESSAGE, MYSQL_PROC } from '../mylib/constant'
import { callProc } from '../mylib/functions/supports'
export const createFavoriteSong = async (req, res) => {
    // console.log(req.body.id)
    try {
        await insert(TABLE.FAVORITE_SONG, {
            account_id: req.profile.account_id,
            song_id: req.body.song_id
        })
        return res.status(StatusCodes.CREATED).json({
            message: MESSAGE.CREATE_OK
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: MESSAGE.CREATE_FAIL
        })
    }
}


export const deleteFavoriteSong = async (req, res) => {
    try {
        await callProc(MYSQL_PROC.DELETE_FAV_SONG, [req.profile.account_id, req.body.song_id])
        return res.status(StatusCodes.OK).json({
            message: MESSAGE.REMOVE_OK
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({
            message: MESSAGE.REMOVE_FAIL
        })
    }
}
export default {
    createFavoriteSong,
    deleteFavoriteSong
}