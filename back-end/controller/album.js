import insert from '../mylib/crud/insert'
import { getAlbumByAlbumId } from '../mylib/crud/read'
import uniqid from 'uniqid'
import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import { PICTURE, DATE_FORMAT, TITLE, TABLE, MESSAGE, MYSQL_PROC } from '../mylib/constant'
import { callProc } from '../mylib/functions/supports'

export const createAlbum = async (req, res) => {
    const album = req.body
    try {
        await insert(TABLE.ALBUM, {
            album_id: uniqid(),
            title: TITLE.ALBUM,
            cover: PICTURE.ALBUM,
            createdAt: moment().format(DATE_FORMAT),
            releaseDate: moment().format(DATE_FORMAT),
            ...album
        })
        return res.status(StatusCodes.CREATED).json({
            message: MESSAGE.CREATE_OK
        })
    } catch (error) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: MESSAGE.CREATE_FAIL
        })
    }
}

/**
 * Host/albums/albumId/songs
 * @param {*request} req 
 * @param {*response} res 
 */
export const responseSongsOnAlbumId = async (req, res) => {

    const { albumId } = req.params
    try {
        const songs = await callProc(MYSQL_PROC.GET_SONGS_BY_ALBUMID, [albumId])
        return res.status(StatusCodes.OK).json(songs)

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const responseAlbumOnAlbumId = async (req, res) => {
    const { albumId } = req.params
    try {
        const album = await getAlbumByAlbumId(albumId)
        return res.status(StatusCodes.OK).json(album)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}
export const allAlbums = async (req, res) => {
    try {
        const albums = await callProc(MYSQL_PROC.GET_ALL_ALBUMS, [])
        // console.log(albums)
        return res.status(StatusCodes.OK).json(albums)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}
export const deleteAlbums = async (req, res) => {
    const { ids } = req.body
    try {
        // const actions = ids.map((id) => callProc(MYSQL_PROC.DELETE_ALBUM, [id]))
        // await Promise.all(actions)
        return res.status(StatusCodes.OK).json({ message: MESSAGE.DELETE_OK })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.DELETE_FAIL })
    }
}
export const randomAlbums = async (req, res) => {
    const { limit } = req.params    
    try {
        const albums = await callProc(MYSQL_PROC.GET_RANDOM_ALBUMS, [limit])
        return res.status(StatusCodes.OK).json(albums)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}
export default {

    allAlbums,
    createAlbum,
    responseSongsOnAlbumId,
    responseAlbumOnAlbumId,
    deleteAlbums,
    randomAlbums
}
