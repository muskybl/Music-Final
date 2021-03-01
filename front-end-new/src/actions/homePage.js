import fetch from 'node-fetch'
import { HOST_ADDRESS, ROUTER } from '../mylib/constant/constStr'
import util from 'util'
import { get } from '../mylib/supports/httpMethods'
import { attachArtists } from './queryTable'
export const loadHeroSlide = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.RANDOM_ALBUMS}`).then(res => res.json())
    
    return data
}

export const loadAlbumsAlltime = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.ALBUMS_ALLTIME}`).then(res => res.json())

    return data.albums

}

export const loadAlbumsWeekly = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.ALBUMS_WEEKLY}`).then(res => res.json())
    return data.albums

}

export const loadPlaylistsAlltime = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.PLAYLISTS_ALLTIME}`).then(res => res.json())
    return data.playlists

}

export const loadPlaylistsWeekly = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.PLAYLISTS_WEEKLY}`).then(res => res.json())
    return data.playlists

}

export const loadSongsAlltime = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.SONGS_ALLTIME}`).then(res => res.json())
    return data.songs

}

export const loadSongsWeekly = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.SONGS_WEEKLY}`).then(res => res.json())
    return data.songs

}
export const suggestSeach = async () => {
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.SUGGEST_SEARCH}`).then(res => res.json())
    // console.log(data)
    return data
}
export const search = async (keyword) => {
    const api = util.format(`${HOST_ADDRESS}/${ROUTER.SEARCH}/%s`, keyword)
    const data = await (await fetch(api, get())).json()
    const songs = await attachArtists(data.songs)
    const emotionSongs = await attachArtists(data.emotionSongs)
    const suggestSongs = await attachArtists(data.suggestSongs)
    return {
        ...data,
        songs,
        emotionSongs,
        suggestSongs
    }
}
export const newest = async () => {
    console.log('newest')
    const data = await fetch(`${HOST_ADDRESS}/${ROUTER.NEWEST}`).then(res => res.json())
    const songs = await attachArtists(data.songs)
    return {
        ...data,
        songs
    }
}
export const loadHomePage = async () => {
    return {
        heroSlides: await loadHeroSlide(),
        albumsAlltime: await loadAlbumsAlltime(),
        albumsWeekly: await loadAlbumsWeekly(),
        playlistsAlltime: await loadPlaylistsAlltime(),
        playlistsWeekly: await loadPlaylistsWeekly(),
        songsAlltime: await loadSongsAlltime(),
        songsWeekly: await loadSongsWeekly(),
        suggestSearch: await suggestSeach()
    }

}