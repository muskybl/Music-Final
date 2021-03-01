import { StatusCodes } from 'http-status-codes'
import { getHotAlbums } from '../mylib/crud/read'
import { callProc, removeDuplicate, suggestRand, concatObjArr } from '../mylib/functions/supports'
import { MYSQL_PROC, } from '../mylib/constant'
import { parseSource } from '../mylib/functions/supports'
import { getArtistAll } from './artist'
import request from 'request'
import view, { PERIODICITY } from "../redis/viewController"

export const trending = (req, res) => {

    callProc(MYSQL_PROC.GET_TRENDING, []).then(songs => res.status(StatusCodes.OK)
        .json(songs)).catch(err => console.log(err))
}

export const hotAlbums = async (req, res) => {
    getHotAlbums().then(albums => res.status(StatusCodes.OK)
        .json(albums)).catch(err => console.log(err))
}

export const suggestSearch = async (req, res) => {
    callProc(MYSQL_PROC.GET_SUGGEST_SEARCH, []).then(suggestion => res.status(StatusCodes.OK)
        .json(suggestion)).catch(err => {
            console.log(err)
            res.status(StatusCodes.NOT_FOUND).json(err)
        })
}

export const getLabel = (sentence) => {
    return new Promise((resolve, reject) => {
        request(`http://localhost:5002/${sentence}`, (err, res, body) => {
            if (err) reject(err)
            resolve(JSON.parse(body))
        })
    })

}
export const predictSongs = async (keyword) => {
    // get 10 mostview song after predict
    const prediction = await getLabel(keyword)
    const labelSongs = parseSource(await view.getSongsByLabel(prediction.label, 10))

    // add more 10 songs
    var suggestEmotionSongs = await callProc(MYSQL_PROC.GET_SONGS_BY_LABEL, [prediction.label, 20 - labelSongs.length])
    return labelSongs.concat(suggestEmotionSongs)
}
export const newest = async (req, res) => {
    const limit = 10
    try {
        var songs = await callProc(MYSQL_PROC.SONGS_DATE_DESC, [limit])
        var albums = await callProc(MYSQL_PROC.ALBUMS_DATE_DESC, [limit])
        var playlists = await callProc(MYSQL_PROC.PLAYLISTS_DATE_DESC, [limit])

        return res.status(StatusCodes.OK).json({
            songs,
            albums,
            playlists
        })
    } catch (error) {
        console.log(error)
    }
}

export const search = async (req, res) => {
    const { keyword } = req.params
    const agr = `%${keyword}%`
    try {

        var artists = await callProc(MYSQL_PROC.SEARCH_ARTISTS, [agr])
        var songs = await callProc(MYSQL_PROC.SEARCH_SONGS, [agr])
        var albums = await callProc(MYSQL_PROC.SEARCH_ALBUMS, [agr])
        var playlists = await callProc(MYSQL_PROC.SEARCH_PLAYLISTS, [agr])
        var emotionSongs = await predictSongs(keyword)

        const promises = artists.map(item => getArtistAll(item.artist_id))
        const parallel = (await Promise.all(promises))[0]

        if (parallel !== undefined) {
            artists = artists.concat(parallel.artist)
            songs = parallel.songs.concat(songs)
            albums = albums.concat(parallel.albums)
            playlists = playlists.concat(parallel.playlists)
        }

        var randomSuggest = await suggestRand(20)
        randomSuggest = concatObjArr({ songs: [], albums, artists, playlists }, randomSuggest)

        const filterArtits = removeDuplicate(randomSuggest.artists, 'artist_id')
        const filterSongs = removeDuplicate(randomSuggest.songs, 'song_id')
        const filterAlbums = removeDuplicate(randomSuggest.albums, 'album_id')
        const filterPlaylists = removeDuplicate(randomSuggest.playlists, 'playlist_id')
        const filterEmotionSongs = removeDuplicate(emotionSongs, 'song_id')

        const searchResult = {
            artists: filterArtits,
            songs,
            suggestSongs: filterSongs,
            albums: filterAlbums,
            playlists: filterPlaylists,
            emotionSongs: filterEmotionSongs
        }
        // res.status(StatusCodes.OK).json(searchResult)

        res.status(StatusCodes.OK).json(searchResult)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }

}
export default {
    trending,
    hotAlbums,
    suggestSearch,
    search,
    newest
}