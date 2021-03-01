import { Router } from 'express'
import favPlaylist from '../controller/favoritePlaylist'
const router = Router()

router.post('/', favPlaylist.createFavPlaylist)

export default router


