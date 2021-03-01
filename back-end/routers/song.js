import { Router } from 'express'
import song from '../controller/song'
import view, { PERIODICITY } from "../redis/viewController"
const router = Router()

router.get('/', song.allSongs)
router.post('/', song.createSong)
router.post('/listen', view.listen)
router.post('/upload', song.upload)
router.get(`/${PERIODICITY.ALLTIME}`, view.getSongAlltime)
router.get(`/${PERIODICITY.DAILY}`, view.getSongDaily)
router.get(`/${PERIODICITY.WEEKLY}`, view.getSongWeekly)
router.get(`/${PERIODICITY.MONTHLY}`, view.getSongMonthly)
router.get('/:songId/artists', song.responseArtistsOnSongId)
export default router


