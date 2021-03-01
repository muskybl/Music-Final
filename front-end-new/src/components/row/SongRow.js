import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'
import { Link, useHistory } from 'react-router-dom'
import AppContext from '../../context/app-context'
import ROUTE from '../../mylib/constant/route'
import FavoriteIcon from '@material-ui/icons/Favorite'
import StarSharpIcon from '@material-ui/icons/StarSharp'
import { isExists } from '../../mylib/supports/functions'
import { useFavStatus } from '../../hook/customs/useHooks'
import { ACTION, ACTION_PREFIX } from '../../mylib/constant/constStr'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SubList from '../panel/SubList'
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteSongPl } from '../../actions/account'
import { premiumDate } from '../../mylib/supports/functions'
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks'
import download from 'downloadjs'
import '../../mylib/supports/CSSClass.css'
const useStyle = makeStyles(() => ({
    info: {
        minWidth: '65%'
    },
    indexStyle: {
        fontSize: '18px',
        marginRight: '17px',
        marginTop: '3%'
        // Width : '60%'
    },
    listItem: {
        alignItems: 'center',
        maxHeight: '60px',
        padding: '10px'
    },
    img: {
        width: '65px',
        marginRight: '13px',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '5%'
    },
    divArtists: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: '#d60a81'
        },

    },
    imgPlayingParent: {
        display: 'flex',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        margin: 'auto'
    },
    imgGifPlaying: {
        position: 'absolute',
        marginTop: '3%',
        marginRight: '1%'
    },
    menuIcon: {
        minWidth: '30px'
    }
}))
const options = [
    "Add to playlist"
]
const SongRow = ({ index, songInfo, selected, isUserPlaylist }) => {
    // app { reducer (select) }
    const { account, dispatchAccount, selections, dispatchSelect, dispatchSnack } = useContext(AppContext)
    const [isFav, setisFav, setshouldUpdate] = useFavStatus('song', songInfo, songInfo.song_id,
        dispatchAccount,
        isExists(account.favSongs, { song_id: songInfo.song_id })
    )
    const classes = useStyle()
    const history = useHistory()
    const isSame = selections.selecting.parent.id === selections.selected.parent.id
    const [isOpen, setOpen] = useState(false);
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

    const onChangeFav = (e) => {
        e.stopPropagation()
        setshouldUpdate(true)
        account.profile.email !== '' ? setisFav(!isFav) : history.push(ROUTE.SIGN_IN)
    }
    useEffect(() => {
        setshouldUpdate(false)
        setisFav(isExists(account.favSongs, { song_id: songInfo.song_id }))
    }, [account, selections])

    const listen = () => {
        const type = isSame ? ACTION.PLAY_INDEX : ACTION.PLAY_SONGS
        dispatchSelect({ type, index })
    }
    const onAddPl = () => {
        if (account.profile.email === '') {
            history.push(ROUTE.SIGN_IN)
            dispatchSnack({
                type: ACTION.SET_SNACK, data: {
                    message: 'You must login to add this song',
                    status: -1
                }
            })
            return
        }
        setOpen(true)
        popupState.close()
    }
    const onRemove = () => {
        if (account.profile.email === '') {
            history.push(ROUTE.SIGN_IN)
            return
        }
        deleteSongPl(songInfo.song_id, selections.selecting.parent.id).then(res => {
            dispatchSnack({
                type: ACTION.SET_SNACK, data: {
                    message: res.message,
                    status: res.status,
                }
            })
            dispatchSelect({ type: ACTION_PREFIX.DELETE_ + ACTION.SONG_PLAYLIST, data: songInfo.song_id })
        })
        popupState.close()
    }
    const closeSublist = useCallback(() => {
        setOpen(false)
    }, [isOpen])


    const song = useMemo(() => songInfo, [])
    const downloadSong = useCallback(() => {
        if (account.profile.email === '') {
            dispatchSnack({
                type: ACTION.SET_SNACK, data: {
                    message: 'You must login to download this song',
                    status: -1
                }
            })
            history.push(ROUTE.SIGN_IN)
            return
        }
        const isPermit = song.premium && premiumDate(account.profile.expiredDate) > 0
        if (isPermit)
            dispatchSnack({
                type: ACTION.SET_SNACK, data: {
                    message: 'Upgrade your account to download this song',
                    status: -1
                }
            })

        else download(song.source)
    }, [songInfo])
    return (
        <div>
            <SubList song={song} mainOpen={isOpen} mainOnClose={closeSublist} />
            <ListItem className={classes.listItem} selected={selected} button>
                <div onClick={listen} style={{ width: '75%', display: 'flex' }}>
                    <div className={classes.indexStyle} >{`${index + 1}`}</div>
                    <div className={classes.imgPlayingParent}>

                        {
                            (selections.isPlaying && selected) ?
                                <img src='/images/playing.gif' alt='playing gif' className={classes.imgGifPlaying} />
                                :
                                null}

                        <img src={songInfo.cover} alt='song cover' className={classes.img} />
                    </div>
                    <ListItemText className={classes.info}

                        primary={<div style={{ fontWeight: 'bold' }}>{songInfo.title}</div>}
                        secondary={
                            <Typography style={{ fontWeight: 'lighter' }} >{

                                songInfo.artists.map((artist, index) =>
                                    <span className='dark-div' key={'artist:' + artist.artist_id}>
                                        <Link
                                            to={'/search/' + artist.fullName}
                                            className={classes.divArtists}
                                            onClick={(e) => e.stopPropagation()}
                                        >{artist.fullName + (index === songInfo.artists.length - 1 ? '' : ', ')}
                                        </Link>
                                    </span>)

                            }</Typography>
                        }
                    />
                    <ListItemText primary={
                        `${String(parseInt((songInfo.duration) / 60)).padStart(2, '0')}
                        :${String(parseInt((songInfo.duration) % 60)).padStart(2, '0')}`}
                        style={{ marginTop: '3%', fontWeight: 'lighter' }}
                        className='dark-div' />
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <ListItemIcon onClick={(e) => e.stopPropagation()}>

                        <IconButton disabled>
                            <StarSharpIcon style={{ color: songInfo.premium ? '#ebf200' : 'inherit' }} />
                        </IconButton>

                        <IconButton onClick={onChangeFav}>
                            <FavoriteIcon color={isFav ? 'secondary' : 'inherit'} fontSize='small' />
                        </IconButton>
                        <div >
                            <IconButton variant="contained" {...bindTrigger(popupState)}>
                                <MoreHorizIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                                {
                                    isUserPlaylist ?
                                        (
                                            < MenuItem onClick={() => onRemove()}>
                                                <ListItemIcon classes={{ root: classes.menuIcon }}>
                                                    <DeleteIcon />
                                                </ListItemIcon>
                                                Remove this from playlist
                                            </MenuItem>
                                        ) :
                                        (
                                            <MenuItem onClick={() => onAddPl()}>
                                                <ListItemIcon classes={{ root: classes.menuIcon }}>
                                                    <AddCircleOutlineIcon />
                                                </ListItemIcon>
                                                Add to playlist
                                            </MenuItem>
                                        )
                                }
                                <MenuItem onClick={() => downloadSong()}>
                                    <ListItemIcon classes={{ root: classes.menuIcon }}>
                                        <GetAppSharpIcon />
                                    </ListItemIcon>
                                    Download
                                </MenuItem>
                            </Menu>

                        </div>
                    </ListItemIcon>
                </div>
            </ListItem>
        </div >
    );
}
//<SubList song={songInfo} />
export default React.memo(SongRow)
