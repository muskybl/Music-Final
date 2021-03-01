import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'
import ListPanel from '../panel/ListPanel'
import SongsPanel from '../panel/SongsPanel'
import {
    fetchSongsByAlbumId, fetchAlbumByAlbumId,
    fetchPlaylistByPlaylistId, fetchSongsByPlaylistId
} from '../../actions/queryTable'
import AppContext from '../../context/app-context'
import { ACTION } from '../../mylib/constant/constStr'
import { useProgress } from '../../hook/customs/useHooks'
const useStyles = makeStyles((theme) => ({
    // incase need        
    row: {
        '&::after': {
            content: "",
            display: 'table',
            clear: 'both',
        }
    },
    listsDetail: {
        width: '22%',
        float: 'left',
        height: '30%'
    },
    songsDetail: {
        width: '78%',
        float: 'left',
        height: '70%'
    },

}))


const GroupSongs = ({ type }) => {

    const { dispatchSelect } = useContext(AppContext)
    const classes = useStyles()
    const { id } = useParams()
    const setLoading = useProgress()
    useEffect(() => {
        console.log('group song')

        setLoading(true)
        if (type === 'album') {
            Promise.all([fetchAlbumByAlbumId(id), fetchSongsByAlbumId(id)]).then(values => {
                dispatchSelect({ type: ACTION.SELECTING_ALBUM, data: { info: values[0], id, type } })
                dispatchSelect({ type: ACTION.SELECTING_SONGS, data: values[1] })
                setLoading(false)
            })
        }
        else { //type === 'playlist
            Promise.all([fetchPlaylistByPlaylistId(id), fetchSongsByPlaylistId(id)]).then(values => {
                dispatchSelect({ type: ACTION.SELECTING_PLAYLIST, data: { info: values[0], id, type } })
                dispatchSelect({ type: ACTION.SELECTING_SONGS, data: values[1] })
                setLoading(false)
            })
        }
    }, [])
    return (
        <div className={classes.root}>
            <div className={classes.listsDetail} >
                <ListPanel type={type} />
            </div>
            <div className={classes.songsDetail}>
                <SongsPanel />
            </div>
        </div>
    )
}

export default React.memo(GroupSongs)