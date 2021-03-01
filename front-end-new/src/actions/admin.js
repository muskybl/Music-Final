import fetch from 'node-fetch'
import { HOST_ADDRESS, QUERY, ROUTER, METHOD } from '../mylib/constant/constStr'
import { modify } from '../mylib/supports/httpMethods'

const uploadSong = async (formData) => {
    try {        
        const api = `${HOST_ADDRESS}/${ROUTER.SONGS}/upload`
        const res = await fetch(api, {
            method: METHOD.POST,
            body: formData
        })        
        return {
            message : (await res.json()).message,
            status : res.status
        }
    } catch (error) {
        console.log(error)
    }
}
const getAllAlbums = async () => {
    try {
        const api = `${HOST_ADDRESS}/${ROUTER.ALBUMS}`
        const albums = await fetch(api).then(res => res.json())
        return albums
    } catch (error) {
        console.log(error)
    }

}
const getAllPlaylists = async () => {
    try {
        const api = `${HOST_ADDRESS}/${ROUTER.PLAYLISTS}`
        const playlists = await fetch(api).then(res => res.json())
        return playlists
    } catch (error) {
        console.log(error)
    }
}
const getAllSongs = async () => {
    try {
        const api = `${HOST_ADDRESS}/${ROUTER.SONGS}`
        const songs = await fetch(api).then(res => res.json())
        return songs
    } catch (error) {
        console.log(error)
    }
}
const getAllAccounts = async () => {
    try {
        const api = `${HOST_ADDRESS}/${ROUTER.ACCOUNTS}`
        const accs = await fetch(api).then(res => res.json())
        return accs
    } catch (error) {
        console.log(error)
    }
}

const deleteAlbums = async (ids) => {

    try {
        const api = `${HOST_ADDRESS}/${ROUTER.ALBUMS}`
        const res = await fetch(api, modify(METHOD.DELETE, { ids }))
        return {
            message: (await res.json()).message,
            status: res.status
        }
    } catch (error) {
        console.log(error)
    }
}
const deletePlaylists = async (ids) => {
    console.log(ids)
    try {
        const api = `${HOST_ADDRESS}/${ROUTER.PLAYLISTS}`
        const res = await fetch(api, modify(METHOD.DELETE, { ids }))
        return {
            message: (await res.json()).message,
            status: res.status
        }
    } catch (error) {
        console.log(error)
    }
}


export default {
    getAllAlbums,
    getAllPlaylists,
    getAllSongs,
    getAllAccounts,
    deleteAlbums,
    deletePlaylists,
    uploadSong
}