import insert from '../mylib/crud/insert'
import { initSongPlaylist } from '../mylib/crud/create'
import { StatusCodes } from 'http-status-codes'
import { TABLE, MESSAGE, MYSQL_PROC } from '../mylib/constant'
import { randomNumber, callProc } from '../mylib/functions/supports'

export const createSongPlaylistMapping = async (req, res) => {

    try {
        await insert(TABLE.SONG_PLAYLIST_MAPPING, {
            song_id: req.body.song_id,
            playlist_id: req.body.playlist_id
        })
        return res.status(StatusCodes.CREATED).json({
            message: MESSAGE.ADD_OK
        })
    } catch (error) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: MESSAGE.ADD_FAIL
        })
    }
}

export const deleteSongFromPl = async (req, res) => {
    try {
        const { song_id, playlist_id } = req.body        
        await callProc(MYSQL_PROC.DELETE_SONG_PL_MAPPING, [song_id, playlist_id])        
        return res.status(StatusCodes.OK).json({
            message: MESSAGE.REMOVE_OK
        })
    } catch (error) {        
        return res.status(StatusCodes.NOT_FOUND).json({
            message: MESSAGE.REMOVE_FAIL
        })
    }
}
export const randomSongToPlaylist = async (req, res) => {
    const { min, max } = req.body
    const numberofSongs = randomNumber(min, max)
    const re = await initSongPlaylist(numberofSongs)
    try {
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

export default {
    createSongPlaylistMapping,
    randomSongToPlaylist,
    deleteSongFromPl
}