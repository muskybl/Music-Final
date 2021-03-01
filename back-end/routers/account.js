import express from 'express'
import account from '../controller/account'
import favoriteAlbum from '../controller/favoriteAlbum'
import favoriteSong from '../controller/favoriteSong'
import favPlaylist from '../controller/favoritePlaylist'
import songPlaylist from '../controller/songPlaylistMapping'
import playlist from '../controller/playlist'
import { authAccount } from './middleware'
import { ROUTER } from '../mylib/constant'
import payment from '../config/payment'
const router = express.Router()

router.post(`/me/payment/createOrder`, authAccount, async (req, res) => {
    const {
        account_id,
        email,
        firstName,
        lastName
    } = req.profile

    const paymentRes = await payment.applyOrder({
        account_id,
        email,
        name: firstName + lastName
    }, req.body.months)
    console.log(paymentRes)
    res.status(200).json({ payment_url: paymentRes.data.payment_url })
})
//http://localhost:8080/payment?created_at=2020-12-22+15%3A09%3A32&id=102146723&mrc_order_id=ABC123%3Ae00c265f-da40-4b35-90e3-495fe6970e90&stat=c&total_amount=10000.00&txn_id=101962351&updated_at=2020-12-22+15%3A21%3A22&checksum=31485d711ce7c76f8ac0973037d09a29c9b1a8771c0b496ec7f67313e8ee835a
//created_at=2020-12-22+17%3A34%3A59&id=102147593&mrc_order_id=Payment+for+1+months%2C+12-22-2020+05%3A34%3A57&stat=c&total_amount=10000.00&txn_id=101962812&updated_at=2020-12-22+17%3A36%3A27&checksum=4bb1c91ba807edc351bf22b31479d50fcc8ce6bb0b7449c13d36ab70f75d4b95


router.post('/me/payment/orderPaid', authAccount, account.orderPaid)
router.get('/me', authAccount, account.accountProfile)
router.get('/:accountId/favAlbums/:albumId', account.responseIsFavAlbum)


router.post(`/me/${ROUTER.FAVORITE_ALBUMS}`, authAccount, favoriteAlbum.createFavAlbum)
router.post(`/me/${ROUTER.FAVORITE_SONGS}`, authAccount, favoriteSong.createFavoriteSong)
router.post(`/me/${ROUTER.FAVORITE_PLAYLISTS}`, authAccount, favPlaylist.createFavPlaylist)
router.post(`/me/${ROUTER.SONG_PLAYLIST_MAPPING}`, authAccount, songPlaylist.createSongPlaylistMapping)
router.post(`/me/${ROUTER.PLAYLIST}`, authAccount, playlist.createPlaylist)

router.delete(`/me/${ROUTER.FAVORITE_SONGS}`, authAccount, favoriteSong.deleteFavoriteSong)
router.delete(`/me/${ROUTER.FAVORITE_ALBUMS}`, authAccount, favoriteAlbum.removeFavAlbum)
router.delete(`/me/${ROUTER.FAVORITE_PLAYLISTS}`, authAccount, favPlaylist.removeFavPlaylist)
router.delete(`/me/${ROUTER.SONG_PLAYLIST_MAPPING}`, authAccount, songPlaylist.deleteSongFromPl)

router.post('/signIn', account.signIn)
router.post('/signUp', account.signUp)
router.get('/', account.allAccounts)

export default router


