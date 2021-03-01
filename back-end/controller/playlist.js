import insert from '../mylib/crud/insert'
import { getPlaylistByPlaylistId } from '../mylib/crud/read'
import uniqid from 'uniqid'
import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import { PICTURE, DATE_FORMAT, TITLE, TABLE, FOLDER, MESSAGE, MYSQL_PROC } from '../mylib/constant'
import { callProc } from '../mylib/functions/supports'
export const createPlaylist = async (req, res) => {
    const playlist = req.body
    const plId = uniqid()
    try {
        const pl = {
            playlist_id: plId,
            title: TITLE.PLAYLIST,
            cover: PICTURE.PLAYLIST,
            createdAt: moment().format(DATE_FORMAT),
            private: 0,
            ...playlist
        }
        await insert(TABLE.PLAYLIST, {
            ...pl,
            account_id: req.profile.account_id,
        })
        await insert(TABLE.FAVORITE_PLAYLIST, {
            account_id: req.profile.account_id,
            playlist_id: plId
        })
        return res.status(StatusCodes.CREATED).json({
            message: MESSAGE.CREATE_OK,
            pl: {
                ...pl,
                cover: FOLDER.IMAGES + pl.cover
            }

        })
    } catch (error) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: MESSAGE.CREATE_FAIL
        })
    }
}
export const resSongsOnPlaylistId = async (req, res) => {
    const { playlistId } = req.params
    try {
        const songs = await callProc(MYSQL_PROC.GET_SONGS_BY_PLAYLISTID, [playlistId])
        return res.status(StatusCodes.OK).json(songs)

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const resPlaylistOnPlaylistId = async (req, res) => {
    const { playlistId } = req.params
    try {
        const playlist = await getPlaylistByPlaylistId(playlistId)
        return res.status(StatusCodes.OK).json(playlist)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

export const allPlaylists = async (req, res) => {
    try {
        const playlists = await callProc(MYSQL_PROC.GET_ALL_PLAYLISTS, [], true)
        return res.status(StatusCodes.OK).json(playlists)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const deletePlaylists = async (req, res) => {
    const { ids } = req.body
    try {
        // const actions = ids.map((id) => callProc(MYSQL_PROC.DELETE_PLAYLIST, [id]))
        // await Promise.all(actions)
        return res.status(StatusCodes.OK).json({ message: MESSAGE.DELETE_OK })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.DELETE_FAIL })
    }
}
export default {
    deletePlaylists,
    allPlaylists,
    createPlaylist,
    resPlaylistOnPlaylistId,
    resSongsOnPlaylistId
}
