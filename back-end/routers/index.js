import { Router } from 'express'
import accountRouter from './account'
import albumRouter from './album'
import songRouter from './song'
import playlistRouter from './playlist';
import songPlaylist from './songPlaylistMapping'
import artistRouter from './artist'
import home from './home'
import genre from './genre'
import { ROUTER } from '../mylib/constant'


const mainRouter = Router()

mainRouter.use(`/${ROUTER.ACCOUNT}`, accountRouter)
mainRouter.use(`/${ROUTER.ALBUM}`, albumRouter)
mainRouter.use(`/${ROUTER.SONG}`, songRouter)
mainRouter.use(`/${ROUTER.PLAYLIST}`, playlistRouter)
mainRouter.use(`/${ROUTER.ARTIST}`, artistRouter)
mainRouter.use(`/${ROUTER.GENRE}`, genre)
// mainRouter.use(`/${ROUTER.SONG_PLAYLIST_MAPPING}`, songPlaylist)

mainRouter.use('/', home)
export default mainRouter

