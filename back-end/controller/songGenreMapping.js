import insert from '../mylib/crud/insert'
import { StatusCodes } from 'http-status-codes'
import { TABLE, MESSAGE } from '../mylib/constant'
export const createSongGenreMapping = (req, res) => {

    try {
        await insert(TABLE.SONG_GENRE_MAPPING, {
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
    createSongGenreMapping
}