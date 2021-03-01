import { MYSQL_PROC, TABLE } from '../constant'
import pool from '../../config/mysql.config'
import jwt from 'jsonwebtoken'
import insert from '../crud/insert'
import moment from 'moment'
import { getRandomSongs, getPlaylists } from './read'
export const generateAuthToken = (account_id, isRemember) => {

    const token = jwt.sign({ account_id }, process.env.JWT_SECRET_KEY, { expiresIn: isRemember ? '90 days' : '1 days' })

    insert(TABLE.ACCOUNT_ACTIVITY, {
        account_id,
        token,
        signIn_date: moment().format('YYYY-MM-DD hh:mm:ss')
    })
        .catch(err => console.log(new Error(err)))

    return token
}

export const createAccount = (account) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(new Error(err))
            else {
                conn.query(MYSQL_PROC.SIGN_UP, [
                    account.account_id,
                    account.email,
                    account.password,
                    account.firstName,
                    account.lastName,                    
                    account.role,
                    account.createdAt,
                    account.avatar,
                    account.expiredDate
                ], (err, results, _) => {
                    conn.release()
                    if (err) reject(new Error(err))                    
                    resolve(results[2][0])
                })
            }
        })
    })

}

export const initSongPlaylist = async (ranNum) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, conn) => {
            if (err) reject(err.message)
            const playlists = await getPlaylists()
            playlists.forEach(async pl => {
                const ranSongs = await getRandomSongs(ranNum)                
                ranSongs.forEach(s => {                    
                    pool.query(MYSQL_PROC.INSERT_SONG_PLAYLIST, [s.song_id, pl.playlist_id], (err, results, _) => {
                        if (err) reject(err.message)                        
                    })                    
                })
            })
            conn.release()
            resolve('ok')
        })


    })

}