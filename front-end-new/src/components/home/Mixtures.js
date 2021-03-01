import React, { useContext, memo, useEffect } from 'react'
import SongsPanel from '../panel/SongsPanel'
import AppContext from '../../context/app-context'
import { ACTION } from '../../mylib/constant/constStr'
import HorizontalList from './HorizontalList'

const Mixtures = ({ data }) => {
    const { dispatchSelect } = useContext(AppContext)
    useEffect(() => {
        dispatchSelect({
            type: ACTION.SELECTING_SONGS,
            data: data.songs,
            parent: {
                id: 'mixtures',
                type: 'search-info',
                info: {}
            }
        })
    }, [])
    return (
        <div>
            <SongsPanel
                isFull={true} title='Newest songs'
                dataSongs={data.songs} startIndex={0} />
            <HorizontalList title="Albums" lists={data.albums} type="albums" key='mixtures albums' />
            <HorizontalList title="Playlists" lists={data.playlists} type="playlists" key='mixtures playlists' />
        </div>
    )
}

export default memo(Mixtures)

