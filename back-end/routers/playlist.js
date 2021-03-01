import { Router } from 'express'
import playlist from '../controller/playlist'
import view from '../redis/viewController'
import { PERIODICITY } from '../redis/viewController'
const router = Router()

router.post('/', playlist.createPlaylist)
router.get('/', playlist.allPlaylists)
router.delete('/', playlist.deletePlaylists)
router.get(`/${PERIODICITY.ALLTIME}`, view.getPlaylistAlltime)
router.get(`/${PERIODICITY.DAILY}`, view.getPlaylistDaily)
router.get(`/${PERIODICITY.WEEKLY}`, view.getPlaylistWeekly)
router.get(`/${PERIODICITY.MONTHLY}`, view.getPlaylistMonthly)


router.get('/:playlistId', playlist.resPlaylistOnPlaylistId)
router.get('/:playlistId/songs', playlist.resSongsOnPlaylistId)
export default router


