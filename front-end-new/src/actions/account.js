import fetch from 'node-fetch'
import { ACCOUNT, ROUTER, HOST_ADDRESS, METHOD, ACCOUNT_ROUTER } from '../mylib/constant/constStr'
import cookies from 'js-cookie'
import { get, post, modify } from '../mylib/supports/httpMethods'

/**
 * 
 * @param {*} data : {email, password, isRemember}
 */
export const signIn = async (data) => {

    const rawData = await fetch(`${HOST_ADDRESS}/${ACCOUNT}/${ROUTER.SIGN_IN}`, post(data))

    return {
        status: rawData.status,
        data: await rawData.json()
    }
}
/**
 * 
 * @param {*} data : {firstName, lastName, email, password, isRemember} 
 */
export const signUp = async (data) => {

    try {
        const rawData = await fetch(`${HOST_ADDRESS}/${ACCOUNT}/${ROUTER.SIGN_UP}`, post(data))

        return {
            status: rawData.status,
            data: await rawData.json()
        }
    } catch (error) {
        console.log(error)
    }

}

export const signInByToken = async () => {
    const account = await fetch(ACCOUNT_ROUTER, get()).then(res => res.json())    
    return account
}

/**
 * 
 * @param {String} album_id as object {album_id}
 */
export const addFavAlbum = async (album_id) => {
    const result =
        await fetch(`${ACCOUNT_ROUTER}/${ROUTER.FAV_ALBUMS}`, modify(METHOD.POST, { album_id }))
            .then(res => res.json())
    return result
}

export const addFavPlaylist = async (playlist_id) => {
    const result =
        await fetch(`${ACCOUNT_ROUTER}/${ROUTER.FAV_PLAYLISTS}`, modify(METHOD.POST, { playlist_id }))
            .then(res => res.json())

    return result
}

export const addPlaylist = async (title) => {
    const res = await fetch(`${ACCOUNT_ROUTER}/${ROUTER.PLAYLISTS}`, modify(METHOD.POST, { title }))
    const { message, pl: playlist } = await res.json()
    return {
        status: res.status,
        message,
        playlist
    }
}
/**
 * 
 * @param {String} album_id 
 */
export const deleteFavAlbum = async (album_id) => {
    console.log('delete album', album_id)
    const result =
        await fetch(`${ACCOUNT_ROUTER}/${ROUTER.FAV_ALBUMS}`, modify(METHOD.DELETE, { album_id }))
            .then(res => res.json())
    return result
}
export const deleteFavPlaylist = async (playlist_id) => {
    console.log('delete pl')
    const result =
        await fetch(`${ACCOUNT_ROUTER}/${ROUTER.FAV_PLAYLISTS}`, modify(METHOD.DELETE, { playlist_id }))
            .then(res => res.json())
    // console.log(result)
    return result
}

export const addFavSong = async (song_id) => {
    await fetch(`${ACCOUNT_ROUTER}/${ROUTER.FAV_SONGS}`, modify(METHOD.POST, { song_id }))
}

export const deleteFavSong = async (song_id) => {
    await fetch(`${ACCOUNT_ROUTER}/${ROUTER.FAV_SONGS}`, modify(METHOD.DELETE, { song_id }))
}

export const trySignInByToken = async () => {
    return cookies.get('token') !== undefined ? await signInByToken() : null
}

export const addSongToPlaylist = async (song_id, playlist_id) => {
    const res = await fetch(
        `${ACCOUNT_ROUTER}/${ROUTER.SONG_PLAYLIST_MAPPING}`,
        modify(METHOD.POST, { song_id, playlist_id }))
    const { message } = await res.json()
    return {
        status: res.status,
        message
    }
}

export const deleteSongPl = async (song_id, playlist_id) => {
    const res =
        await fetch(`${ACCOUNT_ROUTER}/${ROUTER.SONG_PLAYLIST_MAPPING}`,
            modify(METHOD.DELETE, { song_id, playlist_id }))
    const { message } = await res.json()
    return {
        status: res.status,
        message
    }
}

export const createOrder = async (months) => {
    const res = await fetch(`${ACCOUNT_ROUTER}/${ROUTER.CREATE_ORDER}`, modify(METHOD.POST, { months }))
    const payment_url = (await res.json()).payment_url
    return {
        status: res.status,
        payment_url
    }
}

export const orderPaid = async (total_amount) => {
    const res = await fetch(`${ACCOUNT_ROUTER}/${ROUTER.ORDER_PAID}`, modify(METHOD.POST, { total_amount }))
    const message = (await res.json()).message
    return {
        status: res.status,
        message
    }
}