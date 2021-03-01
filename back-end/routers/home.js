import { Router } from 'express'
import home from '../controller/home'
import { ROUTER } from '../mylib/constant'

const router = Router()
router.get(`/${ROUTER.HOME.TRENDING}`, home.trending)
router.get(`/${ROUTER.HOME.HOT_ALBUMS}`, home.hotAlbums)
router.get(`/${ROUTER.HOME.SUGGEST_SEARCH}`, home.suggestSearch)
router.get(`/${ROUTER.HOME.SEARCH}/:keyword`, home.search)
router.get(`/${ROUTER.HOME.NEWEST}`, home.newest)
export default router


