import { MYSQL_PROC } from '../constant'
import pool from '../../config/mysql.config'
import { FOLDER } from '../../mylib/constant'
import { callProc, parseSource } from '../../mylib/functions/supports'
// TODO
/*
    write : sp 
    getGenresBySongId
    getArtistsBySongId
    getSongsByAlbumId
    getSongsByPlaylistId
*/
export const getGenresBySongId = (song_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) return reject(new Error(err))

            conn.query(MYSQL_PROC.GET_GENRES_BY_SONGID, [song_id], (queryErr, results, fields) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr))
                resolve(results)
            })

        })
    })
}

export const getTrending = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(MYSQL_PROC.GET_TRENDING, (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr))

                const mappingSource = results.map(song => {
                    return {
                        ...song,
                        cover: FOLDER.IMAGES + song.cover,
                        source: FOLDER.SONGS + song.source
                    }
                })
                resolve(mappingSource)
            })
        })
    })
}

export const getHotAlbums = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            const qr = 'SELECT * FROM album LIMIT 10'
            conn.query(qr, (queryError, results, _) => {
                conn.release()
                if (queryError) reject(queryError.message)
                const mappingSource = results.map(album => {
                    return {
                        ...album,
                        cover: FOLDER.IMAGES + album.cover
                    }
                })
                resolve(mappingSource)
            })
        })
    })
}

export const getInfoByAlbumId = (albumId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            const qr = 'SELECT * FROM album WHERE album_id=?'
            conn.query(qr, [albumId], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))
                resolve(results)
            })
        })
    })
}




export const isFavAlbum = (accountId, albumId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.IS_FAV_ALBUM, [accountId, albumId], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))
                if (results[0].length != 0) resolve(true)
                else resolve(false)
            })
        })
    })
}

export const getAlbumByAlbumId = (albumId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.GET_ALBUM_BY_ALBUMID, [albumId], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))                
                resolve({ ...results[0][0], cover: FOLDER.IMAGES + results[0][0].cover })
            })
        })
    })
}


/**
 * 
 * @param {*} email 
 */
export const findByCredentials = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.SIGN_IN, [email], (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err.message))
                resolve(results[0][0])
            })
        })
    })
}

export const getHashPassword = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.GET_HASH_PASSWORD, [email], (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err.message))
                resolve({ hashPassword: results[0].length == 0 ? '' : results[0][0].hashPassword })
            })
        })
    })
}

export const getAccountByToken = (acc_id, token) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.GET_ACCOUNT_BY_TOKEN, [acc_id, token], (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err.message))
                // console.log(results[0])
                resolve(results[0][0])
            })
        })
    })
}

export const getFavSongs = (acc_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.GET_FAV_SONGS, [acc_id], (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err.message))
                resolve(results[0])
            })
        })
    })
}

export const getSongBySongId = (songId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.GET_SONG_BY_ID, [songId], (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err.message))
                results[0].length === 0 ? reject('Not exists') : resolve(...results[0])
            })
        })
    })
}

export const getPlaylistByPlaylistId = (playlistId) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))

            conn.query(MYSQL_PROC.GET_PLAYLIST_BY_ID, [playlistId], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))
                if (results[0].length != 0) resolve({ ...results[0][0], cover: FOLDER.IMAGES + results[0][0].cover })
                reject(null)
            })
        })
    })
}

export const getRandomSongs = (ranNum) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(MYSQL_PROC.GET_RANDOM_SONGS, [ranNum], (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err))
                resolve(results)
            })
        })
    })
}

export const getPlaylists = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(MYSQL_PROC.GET_PLAYLISTS, (err, results, _) => {
                conn.release()
                if (err) reject(new Error(err))
                resolve(results)
            })
        })
    })
}

export const getSongsByPlaylistId = (playlistId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(MYSQL_PROC.GET_SONGS_BY_PLAYLISTID, [playlistId], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))
                const mappingSoure = results[0].map(song => {
                    return {
                        ...song,
                        cover: FOLDER.IMAGES + song.cover,
                        source: FOLDER.SONGS + song.source
                    }
                })
                resolve(mappingSoure)
            })
        })
    })
}
export const getSuggestSearch = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(MYSQL_PROC.GET_SUGGEST_SEARCH, [], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))
                resolve(results[0])
            })
        })
    })
}
export const getSongsByArtistId = (artistId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err.message))
            conn.query(MYSQL_PROC.GET_SONGS_BY_ARTISTID, [artistId], (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr.message))
                resolve(results[0])
            })
        })
    })
}

