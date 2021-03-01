import insert from '../mylib/crud/insert'
import { StatusCodes } from 'http-status-codes'
import { TABLE, MESSAGE } from '../mylib/constant'
export const createSongArtistMapping = (req, res) => {

    try {
        await insert(TABLE.SONG_ARTIST_MAPPING, {
            ...req.body
        })
        return res.status(StatusCodes.CREATED).json({
            message: MESSAGE.CREATED
        })
    } catch (error) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: error.message
        })
    }
}

export default {
    createSongArtistMapping
}