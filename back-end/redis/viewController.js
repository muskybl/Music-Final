import moment from 'moment'
import redisClient from './instance'
import { StatusCodes } from 'http-status-codes'
import util from 'util'
import {
    getSongBySongId,
    getAlbumByAlbumId,
    getPlaylistByPlaylistId
} from '../mylib/crud/read'

const ALLTIME_LIMIT = 10 - 1
const DAILY_LIMIT = 10 - 1
const WEEKLY_LIMIT = 10 - 1
const MONTHLY_LIMIT = 10 - 1
const CHUNK = 100
const DAILY_DATE_FORMAT = 'YYYY-MM-DD'
const WEEKLY_DATE_FORMAT = 'YYYY-ww'
const MONTHLY_DATE_FORMAT = 'YYYY-MM'
const VIEW_SONG_KEY = 'view:song'
const VIEW_ALBUM_KEY = 'view:album'
const VIEW_PLAYLIST_KEY = 'view:playlist'

export const PERIODICITY = {
    ALLTIME: 'alltime',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
}
const zrevrange = util.promisify(redisClient.zrevrange)

const viewSongAlltimeKey = () => {
    return `${VIEW_SONG_KEY}:${PERIODICITY.ALLTIME}`
}
const viewAlbumAlltimeKey = () => {
    return `${VIEW_ALBUM_KEY}:${PERIODICITY.ALLTIME}`
}
const viewPlaylistAlltimeKey = () => {
    return `${VIEW_PLAYLIST_KEY}:${PERIODICITY.ALLTIME}`
}


const viewSongDailyKey = () => {
    return `${VIEW_SONG_KEY}:${PERIODICITY.DAILY}:${moment().format(DAILY_DATE_FORMAT)}`
}
const viewAlbumDailyKey = () => {
    return `${VIEW_ALBUM_KEY}:${PERIODICITY.DAILY}:${moment().format(DAILY_DATE_FORMAT)}`
}
const viewPlaylistDailyKey = () => {
    return `${VIEW_PLAYLIST_KEY}:${PERIODICITY.DAILY}:${moment().format(DAILY_DATE_FORMAT)}`
}

const viewSongWeeklyKey = () => {
    return `${VIEW_SONG_KEY}:${PERIODICITY.WEEKLY}:${moment().format(WEEKLY_DATE_FORMAT)}`
}
const viewAlbumWeeklyKey = () => {
    return `${VIEW_ALBUM_KEY}:${PERIODICITY.WEEKLY}:${moment().format(WEEKLY_DATE_FORMAT)}`
}
const viewPlaylistWeeklyKey = () => {
    return `${VIEW_PLAYLIST_KEY}:${PERIODICITY.WEEKLY}:${moment().format(WEEKLY_DATE_FORMAT)}`
}


const viewSongMonthlyKey = () => {
    return `${VIEW_SONG_KEY}:${PERIODICITY.MONTHLY}:${moment().format(MONTHLY_DATE_FORMAT)}`
}
const viewAlbumMonthlyKey = () => {
    return `${VIEW_ALBUM_KEY}:${PERIODICITY.MONTHLY}:${moment().format(MONTHLY_DATE_FORMAT)}`
}
const viewPlaylistMonthlyKey = () => {
    return `${VIEW_PLAYLIST_KEY}:${PERIODICITY.MONTHLY}:${moment().format(MONTHLY_DATE_FORMAT)}`
}

const incrSongView = (song_id) => {
    redisClient.zincrby(viewSongAlltimeKey(), 1, song_id)
    redisClient.zincrby(viewSongDailyKey(), 1, song_id)
    redisClient.zincrby(viewSongWeeklyKey(), 1, song_id)
    redisClient.zincrby(viewSongMonthlyKey(), 1, song_id)
}

const incrAlbumView = (album_id) => {
    redisClient.zincrby(viewAlbumAlltimeKey(), 1, album_id)
    redisClient.zincrby(viewAlbumDailyKey(), 1, album_id)
    redisClient.zincrby(viewAlbumWeeklyKey(), 1, album_id)
    redisClient.zincrby(viewAlbumMonthlyKey(), 1, album_id)
}

const incrPlaylistView = (playlist_id) => {
    redisClient.zincrby(viewPlaylistAlltimeKey(), 1, playlist_id)
    redisClient.zincrby(viewPlaylistDailyKey(), 1, playlist_id)
    redisClient.zincrby(viewPlaylistWeeklyKey(), 1, playlist_id)
    redisClient.zincrby(viewPlaylistMonthlyKey(), 1, playlist_id)
}

/**
 * * The song is ONLY belong to 1 album and can be belong to many playlist
 * * so listen to song will trigger these actions
 * * 1. Incr song view 
 * * 2. Incr album view
 * * 3. Incr all playlist view contains the song
 */
const listen = async (req, res) => {
    try {
        const { song_id, parent_id, type } = req.body

        // Update redis
        // Step 1: Incr song view 
        incrSongView(song_id)

        // Step 2: Incr type : albums/playlists view

        type === 'album' ? incrAlbumView(parent_id) :
            type === 'playlist' ? incrPlaylistView(parent_id) : null

        // Step 3: Incr playlist view if song belong to playlist        
        res.status(StatusCodes.CREATED).json({ message: 'Saved' })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.NOT_FOUND).json({
            message: error
        })
    }
}

/**
 * 
 * @param {Array} resultSongs Array contain ['songid1','songid1_views', ...]
 * @returns {Array} Array constain [{songProps, views: Number}, {}, {}]
 */
const parseSong = async (resultSongs) => {
    const songs = []
    for (let i = 0; i < resultSongs.length; i += 2) {
        const tempSong = await getSongBySongId(resultSongs[i])
        tempSong.views = parseInt(resultSongs[i + 1])
        songs.push(tempSong)
    }
    return songs
}

const songResponse = async (req, res, err, result) => {
    if (err) {
        console.log(err)
        return res.status(StatusCodes.NOT_FOUND).json({ message: err })
    }
    parseSong(result).then(songs =>
        res.status(StatusCodes.OK).json({ songs }))
}
const getSongAlltime = async (req, res) => {
    return redisClient.zrevrange(
        viewSongAlltimeKey(), 0, ALLTIME_LIMIT, 'WITHSCORES',
        (err, result) => {
            songResponse(req, res, err, result)
        })
}

const getSongDaily = async (req, res) => {
    return redisClient.zrevrange(
        viewSongDailyKey(), 0, DAILY_LIMIT, 'WITHSCORES',
        (err, result) => {
            songResponse(req, res, err, result)
        }
    )
}

const getSongWeekly = async (req, res) => {
    return redisClient.zrevrange(
        viewSongWeeklyKey(), 0, WEEKLY_LIMIT, 'WITHSCORES',
        (err, result) => {
            songResponse(req, res, err, result)
        }
    )
}
const getSongMonthly = async (req, res) => {
    return redisClient.zrevrange(
        viewSongMonthlyKey(), 0, MONTHLY_LIMIT, 'WITHSCORES',
        (err, result) => {
            songResponse(req, res, err, result)
        }
    )
}

const parseAlbum = async (resultAlbums) => {
    const albums = []
    for (let i = 0; i < resultAlbums.length; i += 2) {
        const tempAlbum = await getAlbumByAlbumId(resultAlbums[i])
        tempAlbum.views = parseInt(resultAlbums[i + 1])
        albums.push(tempAlbum)
    }
    return albums
}

const albumResponse = async (res, err, resultAlbums) => {
    if (err) {
        console.log(err)
        return res.status(StatusCodes.NOT_FOUND).json({ message: err })
    }
    parseAlbum(resultAlbums).then(albums =>
        res.status(StatusCodes.OK).json({ albums }))
}

const getAlbumAlltime = async (_, res) => {
    return redisClient.zrevrange(
        viewAlbumAlltimeKey(), 0, ALLTIME_LIMIT, 'WITHSCORES',
        (err, result) => {
            albumResponse(res, err, result)
        }
    )
}
const getAlbumDaily = async (_, res) => {
    return redisClient.zrevrange(
        viewAlbumDailyKey(), 0, DAILY_LIMIT, 'WITHSCORES',
        (err, result) => {
            albumResponse(res, err, result)
        }
    )
}
const getAlbumWeekly = async (_, res) => {
    console.log(moment().format(WEEKLY_DATE_FORMAT)) 
    return redisClient.zrevrange(
        viewAlbumWeeklyKey(), 0, WEEKLY_LIMIT, 'WITHSCORES',
        (err, result) => {

            albumResponse(res, err, result)
        }
    )
}
const getAlbumMonthly = async (_, res) => {
    return redisClient.zrevrange(
        viewAlbumMonthlyKey(), 0, MONTHLY_LIMIT, 'WITHSCORES',
        (err, result) => {
            albumResponse(res, err, result)
        }
    )
}

const parsePlaylist = async (resultPlaylists) => {

    const playlists = []
    for (let i = 0; i < resultPlaylists.length; i += 2) {
        const tempPlaylist = await getPlaylistByPlaylistId(resultPlaylists[i])
        tempPlaylist.views = parseInt(resultPlaylists[i + 1])
        playlists.push(tempPlaylist)
    }
    return playlists
}

const playlistResponse = async (res, err, resultPlaylists) => {
    if (err) {
        console.log(err)
        return res.status(StatusCodes.NOT_FOUND).json({ message: err })
    }
    parsePlaylist(resultPlaylists).then(playlists =>
        res.status(StatusCodes.OK).json({ playlists }))
}

const getPlaylistAlltime = async (_, res) => {
    return redisClient.zrevrange(
        viewPlaylistAlltimeKey(), 0, ALLTIME_LIMIT, 'WITHSCORES',
        (err, result) => {
            playlistResponse(res, err, result)
        }
    )
}
const getPlaylistDaily = async (_, res) => {
    return redisClient.zrevrange(
        viewPlaylistDailyKey(), 0, DAILY_LIMIT, 'WITHSCORES',
        (err, result) => {
            playlistResponse(res, err, result)
        }
    )
}
const getPlaylistWeekly = async (_, res) => {
    return redisClient.zrevrange(
        viewPlaylistWeeklyKey(), 0, WEEKLY_LIMIT, 'WITHSCORES',
        (err, result) => {
            playlistResponse(res, err, result)
        }
    )
}
const getPlaylistMonthly = async (_, res) => {
    return redisClient.zrevrange(
        viewPlaylistMonthlyKey(), 0, MONTHLY_LIMIT, 'WITHSCORES',
        (err, result) => {
            playlistResponse(res, err, result)
        }
    )
}

const deletePlaylist = (playlistId) => {

    try {
        redisClient.hdel(viewPlaylistAlltimeKey(), playlistId, (status) => status)
        redisClient.hdel(viewPlaylistDailyKey(), playlistId, (status) => status)
        redisClient.hdel(viewPlaylistWeeklyKey(), playlistId, (status) => status)
        redisClient.hdel(viewPlaylistMonthlyKey(), playlistId, (status) => status)
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}


const getSongsByLabel = (label, limit = -1) => {
    return new Promise((resolve, reject) => {
        const songs = []
        const filter = new Promise((res, rej) => {
            // too stupid when get all songs
            redisClient.zrevrange(viewSongAlltimeKey(), 0, 10, 'WITHSCORES', async (err, result) => {
                if (err) rej(err)
                const temp = await parseSong(result)
                for (const item of temp) {
                    // && item.label === label
                    if (songs.length < limit && item.label === label) songs.push(item)
                    else if (songs.length >= limit) res(songs)
                }
                // incase < limit
                res(songs)
            })
        })

        filter.then(songs => resolve(songs)).catch(err => reject(err))
    })
}
export default {
    listen,
    getSongsByLabel,
    getSongAlltime,
    getSongDaily,
    getSongWeekly,
    getSongMonthly,
    getAlbumAlltime,
    getAlbumDaily,
    getAlbumWeekly,
    getAlbumMonthly,
    getPlaylistAlltime,
    getPlaylistDaily,
    getPlaylistWeekly,
    getPlaylistMonthly,
    deletePlaylist
}
// TODO: complete playlist