import insert from '../mylib/crud/insert'
import { StatusCodes } from 'http-status-codes'
import { TABLE, MESSAGE, MYSQL_PROC } from '../mylib/constant'
import view from '../redis/viewController'
import { callProc } from '../mylib/functions/supports'
export const createFavPlaylist = async (req, res) => {

    try {
        await insert(TABLE.FAVORITE_PLAYLIST, {
            account_id: req.profile.account_id,
            playlist_id: req.body.playlist_id
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
export const removeFavPlaylist = async (req, res) => {
    try {
        const playlist_id = req.body.playlist_id
        await callProc(MYSQL_PROC.DELETE_FAV_PLAYLIST, [req.profile.account_id, playlist_id])
        view.deletePlaylist(playlist_id)
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
    createFavPlaylist,
    removeFavPlaylist
}