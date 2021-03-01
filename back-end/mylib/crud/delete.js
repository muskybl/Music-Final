import { MYSQL_PROC } from '../constant'
import pool from '../../config/mysql.config'



/**
 * 
 * @param {String} SQLCMD SQL command as string with params as (?)
 * @param {Array} args Array of params collrate with SQLCMD
 */
export const deleteRow = (SQLCMD, args) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) return reject(new Error(err))
            conn.query(SQLCMD, args, (queryErr, results, _) => {
                conn.release()
                if (queryErr) reject(new Error(queryErr))
                resolve(results)
            })
        })
    })
}