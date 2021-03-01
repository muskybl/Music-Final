import React, { useContext, useMemo } from 'react'
import AppContext from '../../context/app-context'
import SongRow from '../row/SongRow'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper'
import { isObject, find } from 'lodash'
import '../../mylib/supports/CSSClass.css'
const SongsPanel = ({ isFull = false, title = null, dataSongs = null, startIndex = 0 }) => {
    const { account, selections } = useContext(AppContext)
    const songs = dataSongs === null ? selections.selecting.songs : dataSongs

    const isActive = (songId) => {

        const current = selections.playIndex
        // console.log(selections.playIndex, startIndex)
        if (current < 0) return false
        return songId === selections.selected.songs[current].song_id
    }
    const isUserPlaylist = useMemo(() => {
        return account.userPlaylists.length === 0 ? false :
            isObject(find(account.userPlaylists, function (pl) {
                return pl.playlist_id === selections.selecting.parent.id
            }))

    }, [account, selections])
    return (
        <>
            <h6 style={{
                fontSize: '26px',
                marginTop: '0px',
                marginBottom: '0px',
                color: '#d60446',
            }} >{title === null ? 'Songs' : title}</h6>
            {
                songs.length === 0 ?
                    (
                        <div style={{
                            fontSize: '20px',
                        }}>
                            No songs found
                        </div>
                    )
                    :
                    (
                        <Paper className={isFull ? 'songs-panel' : ''}>
                            <List>
                                {
                                    songs.map((song, index) => {

                                        return (
                                            <div key={song.song_id + (index + startIndex)}>

                                                <SongRow
                                                    index={index + startIndex}
                                                    songInfo={song}
                                                    selected={isActive(song.song_id)}
                                                    isUserPlaylist={isUserPlaylist}
                                                />
                                                <Divider />
                                            </div>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    )
            }
        </>
    );
}
//isSame && index === selections.playIndex
export default React.memo(SongsPanel)

