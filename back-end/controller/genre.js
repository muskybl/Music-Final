import insert from '../mylib/crud/insert'
import { StatusCodes } from 'http-status-codes'
import { callProc, suggestRand, removeDuplicate } from '../mylib/functions/supports'
import { TABLE, MESSAGE, MYSQL_PROC } from '../mylib/constant'
export const createGenre = async (req, res) => {

    try {
        await insert(TABLE.GENRE, {
            ...req.body
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

export const getSuggestGenre = async (req, res) => {
    const { genre } = req.params
    try {
        var songs = await callProc(MYSQL_PROC.GET_SONGS_GENRE, [genre])
        var randomSuggest = await suggestRand(5)
        songs = songs.concat(randomSuggest.songs)
        const filterSongs = removeDuplicate(songs, 'song_id')
        res.status(StatusCodes.OK).json({
            ...randomSuggest,
            songs: filterSongs
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.NOT_FOUND).json({
            message: error
        })
    }
}
export default {
    createGenre,
    getSuggestGenre
}