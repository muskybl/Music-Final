import express from 'express'
import album from '../controller/album'
import view, { PERIODICITY } from "../redis/viewController"

const router = express.Router()


router.post('/', album.createAlbum)
router.get(`/`, album.allAlbums)
router.delete(`/`, album.deleteAlbums)
router.get(`/${PERIODICITY.ALLTIME}`, view.getAlbumAlltime)
router.get(`/${PERIODICITY.DAILY}`, view.getAlbumDaily)
router.get(`/${PERIODICITY.WEEKLY}`, view.getAlbumWeekly)
router.get(`/${PERIODICITY.MONTHLY}`, view.getAlbumMonthly)
router.get(`/random/:limit`, album.randomAlbums)
router.get('/:albumId', album.responseAlbumOnAlbumId)
router.get('/:albumId/songs', album.responseSongsOnAlbumId)
export default router


