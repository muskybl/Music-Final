import insert from '../mylib/crud/insert'
import { callProc } from '../mylib/functions/supports'
import uniqid from 'uniqid'
import { StatusCodes } from 'http-status-codes'
import { PICTURE, DESCRIPTION, TABLE, MESSAGE, MYSQL_PROC } from '../mylib/constant'

export const createArtist = async (req, res) => {
    const artist = req.body
    try {
        await insert(TABLE.ARTIST, {
            artist_id: uniqid(),
            avatar: PICTURE.ARTIST,
            description: DESCRIPTION.ARTIST,
            ...artist
        })
        return res.status(StatusCodes.CREATED).json({
            message: MESSAGE.CREATE_OK
        })
    } catch (error) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: error.message
        })
    }
}

export const getArtistAll = async (artistId) => {
    const artist = await callProc(MYSQL_PROC.GET_ARTIST_BY_ARTISTID, [artistId])
    const songs = await callProc(MYSQL_PROC.GET_SONGS_BY_ARTISTID, [artistId])
    const playlists = await callProc(MYSQL_PROC.GET_PLAYLISTS_BY_ARTISTID, [artistId])
    const albums = await callProc(MYSQL_PROC.GET_ALBUMS_BY_ARTISTID, [artistId])    
    return {
        artist,
        songs,
        playlists,
        albums
    }
    
}
export const getRelativeArtistInfo = async (req, res) => {
    const { artistId } = req.params

    try {
        const allInfo = await getArtistAll(artistId)
        res.status(StatusCodes.OK).json(allInfo)        

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }
}
export default {
    createArtist,
    getRelativeArtistInfo,
    getArtistAll
}