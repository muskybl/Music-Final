import insert from '../mylib/crud/insert'
import uniqid from 'uniqid'
import { StatusCodes } from 'http-status-codes'
import { PICTURE, DATE_FORMAT, MYSQL_PROC, HOST } from '../mylib/constant'
import moment from 'moment'
import { callProc } from '../mylib/functions/supports'
import fs from 'fs'
import path from 'path'
const createSong = async (req, res) => {
    const song = req.body
    try {
        await insert('song', {
            song_id: uniqid(),
            cover: PICTURE.SONG,
            releaseDate: moment().format(DATE_FORMAT),
            createdAt: moment().format(DATE_FORMAT),
            ...song
        })
        return res.status(StatusCodes.CREATED).json({
            message: 'Created'
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: error.message
        })
    }
}

const responseArtistsOnSongId = async (req, res) => {
    const { songId } = req.params
    try {
        const artists = await callProc(MYSQL_PROC.GET_ARTISTS_BY_SONGID, [songId])
        return res.status(StatusCodes.OK).json(artists)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}
export const allSongs = async (req, res) => {
    try {
        const songs = await callProc(MYSQL_PROC.GET_ALL_SONGS, [])
        return res.status(StatusCodes.OK).json(songs)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}
export const upload = async (req, res) => {

    const { source, cover } = req.files
    const mp3Name = source.name.replace(/ /g, '')
    const coverName = cover.name.replace(/ /g, '')
    try {
        // console.log()
        fs.writeFile(path.join(__dirname, '../files/songs/' + mp3Name), source.data, (err, _) => {
            if (err) console.log(err)

        })
        fs.writeFile(path.join(__dirname, '../files/images/' + coverName), cover.data, (err, _) => {
            if (err) console.log(err)
        })
        callProc(MYSQL_PROC.CREATE_SONG, [
            uniqid(),
            req.body.album_id,
            req.body.title,
            coverName,
            mp3Name,
            moment(req.body.releasedDate).format('YYYY-MM-DD'),
            'LYRICS',
            parseInt(req.body.duration),
            moment().format('YYYY-MM-DD'),
            req.body.premium === 'true' ? 1 : 0,
            req.body.label

        ]).then(res => console.log(res)).catch(err => console.log(err))
    } catch (error) {
        console.log(error)
    }

    return res.status(StatusCodes.OK).json({ message: 'Upload song successfully' })
}
export default {
    createSong,
    allSongs,
    responseArtistsOnSongId,
    upload
}