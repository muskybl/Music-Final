import { Router } from 'express'
import songPlaylistMapping from '../controller/songPlaylistMapping'
const router = Router()

router.post('/', songPlaylistMapping.createSongPlaylistMapping)
router.post('/random', songPlaylistMapping.randomSongToPlaylist)
export default router


