import { StatusCodes } from 'http-status-codes'
import { callProc } from '../mylib/functions/supports'
import { MYSQL_PROC } from '../mylib/constant'
export const querySongsByAlbumId = async (req, res) => {
    const { albumId } = req.params
    try {
        const songs = await callProc(MYSQL_PROC.GET_SONGS_BY_ALBUMID, [albumId])
        res.status(StatusCodes.OK).json(songs)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}


export default {
    querySongsByAlbumId,
    
}