import path from 'path'
import fs from 'fs'
import jsmeta from 'jsmediatags'
import ffmetadata from 'ffmetadata'
import mp3Duration from 'mp3-duration'
import { getAudioDurationInSeconds } from 'get-audio-duration'
// import pool from '../config/mysql.config'
import uniqid from 'uniqid'
// import bcrypt from 'bcrypt'
import { PICTURE, TABLE, DESCRIPTION, LYRICS, DATE_FORMAT, TITLE } from '../mylib/constant'
import moment from 'moment'
import { saveIMGFromMP3, callProc } from '../mylib/functions/supports'
import insert from '../mylib/crud/insert'
// const __dirname = path.resolve();
const dirPath = path.join(__dirname, '../files/temp')
const dirJoy = path.join(__dirname, '../files/joy')

const test = () => {
    const joyPath = []
    fs.readdir(dirJoy, async (err, files) => {
        if (err) console.log(err)
        for (const file of files) {
            const filePath = path.join(dirJoy, file)
            joyPath.push(filePath)
            // const joySongs = await callProc('SELECT title FROM song WHERE label = ?', ['joy'])
            // console.log(joySongs)
            jsmeta.read(filePath, {
                onSuccess: async (tag) => {
                    const raw = file.split('.mp3')[0]
                    const imgPath = path.join(dirJoy, '../temp', raw + '.jpg')
                    saveIMGFromMP3(tag.tags.picture.data, imgPath, (err, mess) => {
                        if (err) console.log(err)
                        else console.log(mess)
                    })
                    // console.log(raw)
                    // console.log(tag.tags.title) alan beast
                    // const tg = tag.tags
                    // console.log(file)
                    // const rawfile = (file.split(' - ')[1].split('.mp3')[0])
                    // console.log(rawfile)
                    // .replace(/ /g, '')

                    // console.log(joySongs)
                    // const findSong = (await callProc('select title from song where title like ? and label = ?', [rawfile, 'joy']))

                    // console.log(rawfile, findSong)
                    // const imgPath = path.join(dirJoy, '../temp',rawfile + '.jpg')
                    // console.log(imgPath)


                },
                onError: (err) => {
                    console.log(err)
                }
            })
        }
    })

    // saveIMGFromMP3(tag.tags.picture.data, imgPath, (err, mess) => {
    //     if(err) console.log(err)
    //     else console.log(mess)
    // }) 
    // fs.readdir(dirPath, async (err, files) => {
    //     if (err) console.log(err)
    //     for (const file of files) {
    //         const filePath = path.join(dirPath, file)
    //         jsmeta.read(filePath, {
    //             onSuccess: async (tag) => {

    //             },
    //             onError: (err) => {
    //                 console.log(err)
    //             }
    //         })
    //     }
    // })

    // fs.readdir(dirPath, async (err, files) => {
    //     if (err) console.log('read-dir', err)
    //     else {
    //         for (const file of files) {
    //             const filePath = path.join(dirPath, file)
    //             // console.log(file.split(' - ')[0].split('.mp3')[0])
    //             // ffmetadata.write(filePath, { album: file.split(' - ')[1].split('.mp3')[0] }, (err) => {
    //             //     if (err) console.log(err)
    //             //     else console.log('saved')
    //             // })

    //             jsmeta.read(filePath, {
    //                 onSuccess: async (tag) => {
    //                     try {
    //                         const tg = tag.tags
    //                         const ats = (file.split(' - ')[0].split('.mp3')[0]).split(',')
    //                         const rawfile = (file.split(' - ')[1].split('.mp3')[0]).replace(/ /g, '')
    //                         const imgPath = path.join(dirPath, '../temp', rawfile + '.jpg')
    //                         console.log(tg.TXXX)
    //                         // console.log(imgPath)
    //                         // fs.rename(path.join(dirPath, file), rawfile)
    //                         // await saveIMGFromMP3(tag.tags.picture.data, imgPath)

    //                         // const dur = await mp3Duration(path.join(dirPath, file))
    //                         // const albumId = (await callProc(`SELECT album_id FROM album WHERE title like ?`, [tg.album]))[0].album_id
    //                         // const sid = uniqid()
    //                         // await insert('song', {
    //                         //     song_id: sid,
    //                         //     album_id: albumId,
    //                         //     title: tg.title,
    //                         //     cover: rawfile + '.jpg',
    //                         //     source: rawfile + '.mp3',
    //                         //     releaseDate: moment(tg.year).format('YYYY-MM-DD'),
    //                         //     lyrics: LYRICS,
    //                         //     duration: Math.floor(dur),
    //                         //     createdAt: moment().format('YYYY-MM-DD'),
    //                         //     label: 'joy'
    //                         // })
    //                         // await insert(TABLE.SONG_GENRE_MAPPING, {
    //                         //     genre_id: '2ecw795gkfwu8p38', //pop
    //                         //     song_id: sid
    //                         // })
    //                         //   await insert(TABLE.SONG_GENRE_MAPPING, {
    //                         //     genre_id: '2ecw795gkfwu8if8', // rap
    //                         //     song_id: sid
    //                         // })
    //                         // for(const art of ats) {
    //                         //     const artistId = (await callProc(`SELECT artist_id FROM artist WHERE fullName like ?`, [art]))[0].artist_id
    //                         //     await insert(TABLE.SONG_ARTIST_MAPPING, {
    //                         //         song_id : sid,
    //                         //         artist_id : artistId
    //                         //     })
    //                         // }

    //                         // console.log(rawfile)
    //                         // const albumId = uniqid()
    //                         // console.log(tg.album)
    //                         // await insert('album', {
    //                         //     album_id: albumId,
    //                         //     title: tg.album,
    //                         //     cover: rawfile + '.jpg',
    //                         //     releaseDate: moment(tg.year).format('YYYY-MM-DD'),
    //                         //     createdAt: moment().format('YYYY-MM-DD'),

    //                         // })
    //                         // for (const art of ats) {
    //                         //     console.log(art)
    //                         //     const artistId = (await callProc(`SELECT artist_id FROM artist WHERE fullName like ?`, [art]))[0].artist_id
    //                         //     await insert('album_artist_mapping', {
    //                         //         album_id: albumId,
    //                         //         artist_id: artistId
    //                         //     })
    //                         // }
    //                         // for (const art of ats) {            
    //                         // console.log(tg.album)


    //                         // const s = await saveIMGFromMP3(tag.tags.picture.data, imgPath)
    //                         // console.log(s)
    //                         // const ats = tg.artist.split(',')
    //                         // const dur = await mp3Duration(path.join(dirPath, file))



    //                         // // // console.log(albumId)       

    //                         // console.log(artistId)

    //                         // mp3Duration(path.join(dirPath, file), async (err, dur) => {
    //                         //     if (err) console.log(err)
    //                         //     //genreid: 2ecw795gkfwu8os5

    //                         //     const al = uniqid()
    //                         //     await insert('album', {
    //                         //         album_id: al,
    //                         //         title: tg.album,
    //                         //         cover: file.split('.mp3')[0] + '.jpg',
    //                         //         releaseDay: moment(tg.year).format('YYYY-MM-DD'),
    //                         //         createdAt: moment().format('YYYY-MM-DD'),
    //                         //     })
    //                         //     const sid = uniqid()

    //                         // })




    //                         // }


    //                         // console.log([, tg.artist, ])
    //                     } catch (error) {
    //                         console.log(error)
    //                     }

    //                 },
    //                 onError: function (error) {
    //                     console.log(':(', error.type, error.info);
    //                 }
    //             })
    //         }
    //     }
    // })
}

// test()
// const preArtist = (artist) => {

// }
export default test