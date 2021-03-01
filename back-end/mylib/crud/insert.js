import pool from '../../config/mysql.config'

const insert = (tableName, dataToInsert) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {                
                reject(new Error(err))
            }                    
            if (tableName && dataToInsert) {
                if (Object.keys(dataToInsert).length > 0) {
                    var mysqlQuery = 'INSERT INTO `' + tableName + '` (';
                    var i = 0;
                    for (var index in dataToInsert) {
                        mysqlQuery += index;
                        mysqlQuery += (i + 1 == Object.keys(dataToInsert).length ? ') ' : ', ');
                        i++;
                    }
                    i = 0;
                    mysqlQuery += 'VALUES (';
                    for (index in dataToInsert) {
                        mysqlQuery += typeof (dataToInsert[index]) == 'string' ? '"' + dataToInsert[index].replace(/"/g, '\\"') + '"' : dataToInsert[index];
                        mysqlQuery += (i + 1 == Object.keys(dataToInsert).length ? ') ' : ', ');
                        i++;
                    }
                    conn.query(mysqlQuery, (err, res) => {
                        conn.release()
                        if (err) reject(new Error(err))
                        resolve(res)
                    });
                }
                else {
                    conn.release()
                    reject(new Error('mysql-json [insert]: data has to contain at least one field'));
                }
            }
            else {
                conn.release()
                reject(new Error('mysql-json [insert]: Require at least a tableName and a data'));
            }
        })
    })
}
export default insert