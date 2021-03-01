import React, { useEffect, useContext } from 'react';
import { ACTION } from '../../mylib/constant/constStr'
import AppContext from '../../context/app-context'
import SongPanel from './SongsPanel'
import { attachArtists } from '../../actions/queryTable'
const FavSong = () => {
    const { account, dispatchSelect } = useContext(AppContext)
    useEffect(() => {
        let mounted = true
        attachArtists(account.favSongs).then(songs => {
            if (mounted) {
                dispatchSelect({ type: ACTION.SELECTING_SONGS, data: songs })
            }
        })
        return () => mounted = false
    }, [account.favSongs, dispatchSelect])

    return (
        <SongPanel />
    );
}

export default React.memo(FavSong);
