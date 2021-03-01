import { Router } from 'express'
import songGenreMapping from '../controller/songGenreMapping'
const router = Router()

router.post('/', songGenreMapping.createSongGenreMapping)

export default router


