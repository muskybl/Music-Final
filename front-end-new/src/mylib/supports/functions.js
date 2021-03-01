import _ from 'lodash'
import { MAX_ARTIST_NAME_DESCRIPTION } from '../constant/constNumber'
import { isString } from 'lodash'
import moment from 'moment'
export const songsPipeMusicPlayer = (songs) => {

    var audiosList = []
    for (const song of songs) {
        audiosList.push({
            name: song.title,
            musicSrc: song.source,
            cover: song.cover,
            singer: artistsArrayToString(song.artists)
        })
    }
    return audiosList
}

export const artistsArrayToString = (artists) => {
    var result = ''
    for (const artist of artists) {
        if (artist.fullName != null) {
            result += artist.fullName + ', '
        }
    }
    if ((result.length - 2) > MAX_ARTIST_NAME_DESCRIPTION)
        return result.substring(0, MAX_ARTIST_NAME_DESCRIPTION) + '...'
    return result.substring(0, result.length - 3)
}

/**
 * 
 * @param {*Array} arrayObjs - Array of obj
 * @param {*Object} obj - {key : value}
 * 
 * The function return true : false the object has key : value 
 * in the array of obj
 */
export const isExists = (arrayObjs, obj) => {
    return _.isObject(_.find(arrayObjs, obj))
}

export const checkFav = (type, account, id) => {
    return type === 'album' ?
        isExists(account.favAlbums, { album_id: id }) :
        isExists(account.favPlaylists, { playlist_id: id }) || isExists(account.userPlaylists, { playlist_id: id })
}

export const premiumDate = (expiredDate) => {
    return moment().diff(expiredDate, 'days')
}

export const statusSeverity = (status) => {
    if (isString(status)) return status
    return (status === 201 || status === 200) ? 'success' : 'error'
}
export const parseSearch = (search) => {
    return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', 
    function (key, value) { return key === "" ? value : decodeURIComponent(value) })
}