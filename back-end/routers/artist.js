import { Router } from 'express'
import artist from '../controller/artist'
const router = Router()

router.post('/', artist.createArtist)
router.get('/:artistId', artist.getRelativeArtistInfo)
export default router


