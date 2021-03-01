import mysql from 'mysql'
import { TIMEOUT, LIMIT_REQUESTS, MYSQL_CONNECT_PORT } from '../mylib/constantNumber'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'music-sanctum',
    port: MYSQL_CONNECT_PORT,
    queueLimit: LIMIT_REQUESTS, 
    connectionLimit: LIMIT_REQUESTS,
    connectTimeout: TIMEOUT,
    acquireTimeout: TIMEOUT,
    timeout: TIMEOUT,
})

export default pool
