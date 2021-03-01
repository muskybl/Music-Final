// myJsonSQL.insert('artist', {
//     artist_id: uniqid(),
//     fullName: tag.tags.artist,
//     description: ARTIST_DESCRIPTION,
//     avatar: ARTIST_AVATAR
// }, (err, res) => {
//     if (err) console.log(err)
//     else console.log('ok')
// })

//                                  add song
// mp3Duration(path.join(dirPath, file), (err, dur) => {
//     if(err) console.log(err)                            

// })
                // add album
            // myJsonSQL.insert('album', {
            //     album_id : albumID,
            //     title : 'Single Album',
            //     cover : ALBUM_COVER,
            //     releaseDay : moment().format('YYYY-MM-DD'),
            //     createdAt : moment().format('YYYY-MM-DD')
            // }, (err, res) => {
            //     if (err) console.log(err)
            //     else console.log('ok album')
            // })

// pool.getConnection((err, conn) => {
//     if (err) throw new Error(err)
//     console.log(GET_GENRES_BY_SONGID)
//     conn.query(GET_ARTISTS_BY_SONGID, ['2ecw762okfxpvsu2'], (err, res, _) => {
//         if (err) {
//             console.log(err)
//             throw new Error(err)
//         }
//         console.log(res)
//     })
//     conn.release()
// })

/*
    design mongoose db for user's habit
    base on user (account)
    datetime - account_id - album_id - views
    datetime - account_id - playlist_id - views
    datetime - account_id - song_id - views

    datetime - account_id - [{album_id : '_id' , views : 123}]
    datetime - account_id - [{playlist_id : '_id' , views : 123}]
    datetime - account_id - [{song_id : '_id' , views : 123}]

    -- ALBUM collections prototype 1
    {
        date : '09-09-2020',
        album_id : 'al_id',
        accounts : ['account_id1','account_id2']
        views : 123                                
    }

    -- ALBUM prototype 2
        -- Nosql
        album_logs {
            _id: 'xxxxx',            
            date : '09-09-2020',
            album_id : 'al_id'            
        }    
        
        
        interacts {
            _id : ObjectId,
            album_logs_id : 'xxxxx',
            account_id
        }
        -- Redis
        {
            date : '09-09-2020',
            album_logs_id : 'xxxxx',
            views : 123
        }
        -- Mysql
        {
            date, album_id, dayview, weekview, totalview
        }


*/


// const album_id = uniqid()
//                             const song_id = uniqid()

//                             const genres = tag.tags.genre.split('/')
//                             const artists = tag.tags.artist.split(',')

//                             // create ALBUM
//                             insert(TABLE.ALBUM, {
//                                 album_id,
//                                 title: TITLE.ALBUM,
//                                 cover: PICTURE.ALBUM,
//                                 releaseDate: moment().format(DATE_FORMAT),
//                                 createdAt: moment().format(DATE_FORMAT)
//                             }).then(a => console.log(a)).catch(e => console.log(e))

//                             // create SONG            
//                             getAudioDurationInSeconds(path.join(dirPath, file)).then(dur => {
//                                 insert(TABLE.SONG, {
//                                     song_id,
//                                     album_id,
//                                     title: tag.tags.title,
//                                     cover: file.split('.mp3')[0] + '.jpg',
//                                     source: file,
//                                     releaseDate: moment(tag.tags.year).format(DATE_FORMAT),
//                                     lyrics: LYRICS,
//                                     duration: Math.floor(dur),
//                                     createdAt: moment().format(DATE_FORMAT)
//                                 }).then(a => console.log(a)).catch(e => console.log(e))
//                             })
//                             // mp3Duration(path.join(dirPath, file), function (err, dur) {
//                             //     console.log('Dur')
//                             //     if (err) {
//                             //         console.log(err)
//                             //         throw new Error(err)

//                             //     }
//                             //     console.log('Dur')

//                             // })

//                             // create ARTIST ENROLLMENT
//                             artists.forEach(art => {

//                                 pool.getConnection((err, conn) => {
//                                     if (err) throw new Error(err)
//                                     conn.query(selectArtist, [art.trim()], (error, results, fields) => {
//                                         if (error) {
//                                             console.log(error)
//                                             throw new Error(error)
//                                         }
//                                         if (results.length > 0) {
//                                             insert(TABLE.ARTIST_ENROLLMENT, {
//                                                 artist_id: results[0].artist_id,
//                                                 album_id
//                                             }).then(a => console.log(a)).catch(e => console.log(e))
//                                         }
//                                     })
//                                     conn.release()
//                                 })
//                             })

//                             genres.forEach(gen => {

//                                 pool.getConnection((err, conn) => {
//                                     if (err) throw new Error(err)
//                                     conn.query(selectGenre, [gen.trim()], (error, results, fields) => {
//                                         if (error) {
//                                             console.log(error)
//                                             throw new Error(error)
//                                         }
//                                         if (results.length > 0) {
//                                             try {
//                                                 insert(TABLE.GENRE_ENROLLMENT, {
//                                                     genre_id: results[0].genre_id,
//                                                     song_id
//                                                 }).then(a => console.log(a)).catch(e => console.log(e))
//                                             } catch (error) {
//                                                 console.log('Fail genres')
//                                             }

//                                         }
//                                     })
//                                     conn.release()
//                                 })
//                             })
// const imgPath = path.join(dirPath, '../images', file.split('.mp3')[0] + '.jpg')
//                             saveIMGFromMP3(tag.tags.picture.data,
//                                 imgPath,
//                                 (err, mess) => {
//                                     if (err) console.log(err)
//                                     console.log(mess)
//                                 })