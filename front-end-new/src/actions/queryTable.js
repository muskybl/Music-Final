import fetch from 'node-fetch'
import { HOST_ADDRESS, QUERY } from '../mylib/constant/constStr'
import util from 'util'

/**
 * Simply return the array of songs' information
 * @param {string} albumId get songs by albumId
 * 
 */
export const fetchSongsByAlbumId = async (albumId) => {
    try {

        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_SONGS_BY_ALBUMID}`, albumId)
        const songs = await fetch(apiRoute).then(res => res.json())

        const artistsSongs = songs.map(async (song) => {
            return {
                ...song,
                artists: await fetchArtistsBySongId(song.song_id)
            }
        })

        return Promise.all(artistsSongs)
    } catch (error) {
        return new Error(error.message)
    }
}
export const fetchSongsByPlaylistId = async (playlistId) => {
    try {

        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_SONGS_BY_PLID}`, playlistId)
        const songs = await fetch(apiRoute).then(res => res.json())

        const artistsSongs = songs.map(async (song) => {
            return {
                ...song,
                artists: await fetchArtistsBySongId(song.song_id)
            }
        })

        return Promise.all(artistsSongs)
    } catch (error) {
        return new Error(error.message)
    }
}

export const fetchArtistsByAlbumId = async (albumId) => {
    try {
        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_ARTISTS_BY_ALBUMID}`, albumId)

        const artists = await fetch(apiRoute).then(res => res.json())
        return artists
    } catch (error) {
        return new Error(error.message)
    }
}
export const fetchArtistInfo = async (playlistId) => {
    try {
        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_ARTIST_INFO}`, playlistId)
        const data = await fetch(apiRoute).then(res => res.json())

        const newSongs = await attachArtists(data.songs)
        return await {
            ...data,
            songs: newSongs
        }


    } catch (error) {
        return new Error(error.message)
    }
}

export const attachArtists = async (songs) => {
    try {
        const artistsSongs = await songs.map(async (song) => {
            return {
                ...song,
                artists: await fetchArtistsBySongId(song.song_id)
            }
        })
        return await Promise.all(artistsSongs).then(values => values)
    } catch (error) {
        return new Error(error.message)
    }
}


export const fetchArtistsBySongId = async (songId) => {
    try {
        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_ARTISTS_BY_SONGID}`, songId)
        const artists = await fetch(apiRoute).then(res => res.json())
        return artists
    } catch (error) {
        return new Error(error.message)
    }
}

export const fetchAlbumByAlbumId = async (albumId) => {
    try {
        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_ALBUM_BY_ALBUMID}`, albumId)
        const album = await fetch(apiRoute).then(res => res.json())
        return album
    } catch (error) {
        return new Error(error.message)
    }
}
export const fetchPlaylistByPlaylistId = async (playlistId) => {
    try {
        const apiRoute = util.format(`${HOST_ADDRESS}/${QUERY.GET_PLAYLIST_BY_PLID}`, playlistId)
        const playlist = await fetch(apiRoute).then(res => res.json())
        return playlist
    } catch (error) {
        return new Error(error.message)
    }
}