import { Router } from 'express'
import genre from '../controller/genre'
const router = Router()

router.post('/', genre.createGenre)
router.get('/:genre', genre.getSuggestGenre)
export default router


