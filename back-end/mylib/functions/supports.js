import fs from 'fs'
import { FOLDER, MYSQL_PROC } from '../constant'
import pool from '../../config/mysql.config'
import { PRICE_1_MONTHS, PRICE_6_MONTHS, PRICE_12_MONTHS } from '../constantNumber'
import moment from 'moment'
/**
 * 
 * @param {Array} data - The array data exacted from tag.tags.picture.data
 * @param {string} saveTo - The fs path save in
 * @param {function} callback - callback (err, message)
 */
export const saveIMGFromMP3 = (data, saveTo, callback) => {
    const buffer = new Buffer.from(data)
    fs.writeFile(saveTo, buffer, (err) => err ? callback(err, null) : callback(null, 'OK'))
}

export const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const parseSource = (lists, isAdmin = false) => {
    if (!Array.isArray(lists)) return
    return lists.map(item => {
        if (item.hasOwnProperty('account_id') && !isAdmin) delete item.account_id
        const temp = {
            ...item,
            cover: item.hasOwnProperty('cover') ? FOLDER.IMAGES + item.cover : undefined,
            source: item.hasOwnProperty('source') ? FOLDER.SONGS + item.source : undefined,
            avatar: item.hasOwnProperty('avatar') ? FOLDER.IMAGES + item.avatar : undefined
        }
        temp.cover === undefined && delete temp.cover
        temp.source === undefined && delete temp.source
        temp.avatar === undefined && delete temp.avatar
        return temp
    })
}

/**
 * 
 * @param {String} Procedure Procedure name
 * @param {Array} agrs Array of agrs proc
 */
export const callProc = (Procedure, agrs, isAdmin = false) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(Procedure, agrs, (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr))
                if (results === undefined) return reject(new Error('Invalid SQL command'))
                return resolve(parseSource(Array.isArray(results[0]) ? results[0] : results, isAdmin))
            })
        })
    })
}

/**
 * 
 * @param {Array} lists An array of object
 * @param {Prop} properties A properties of an object to remove duplicate
 */
export const removeDuplicate = (lists, properties) => {

    const seen = new Set()
    const filterResults = lists.filter(item => {
        const duplicate = seen.has(item[properties])
        seen.add(item[properties])
        return !duplicate
    })
    return filterResults
}

export const suggestRand = async (limit) => {
    const songs = await callProc(MYSQL_PROC.GET_RANDOM_SONGS, [limit])
    const albums = await callProc(MYSQL_PROC.GET_RANDOM_ALBUMS, [limit])
    const playlists = await callProc(MYSQL_PROC.GET_RANDOM_PLAYLISTS, [limit])
    const artists = await callProc(MYSQL_PROC.GET_RANDOM_ARTISTS, [limit])

    return {
        songs,
        albums,
        playlists,
        artists
    }
}

export const concatObjArr = (obj1, obj2) => {
    return {
        songs: obj1.songs.concat(obj2.songs),
        albums: obj1.albums.concat(obj2.albums),
        playlists: obj1.playlists.concat(obj2.playlists),
        artists: obj1.artists.concat(obj2.artists)
    }
}
export const getMonthsOrderPrices = (total_amount) => {
    return total_amount === PRICE_1_MONTHS ? 1 : total_amount === PRICE_6_MONTHS ? 6 : 12
}

export const addTime = (startDate, value, type) => {
    const daysDiff = startDate.diff(moment(), 'days')
    const result = daysDiff < 0 ? moment().add(value, type) : startDate.add(value, type)
    return result.format('YYYY-MM-DD')    
}