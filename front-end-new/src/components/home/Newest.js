import React, { useEffect, useState, memo } from 'react'
import { newest } from '../../actions/homePage'
import Mixtures from './Mixtures'
const Newest = () => {
    const [newestRelease, setNew] = useState({
        songs: [],
        albums: [],
        playlists: []
    })
    useEffect(() => {
        newest().then(res => {
            console.log(res)
            setNew(res)
        })
    }, [])
    return (
        <Mixtures data={newestRelease} />
    )
}
export default memo(Newest)