import React, { useState, useContext, useEffect, useRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppContext from '../../context/app-context'
import StarSharpIcon from '@material-ui/icons/StarSharp'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { useFavStatus } from '../../hook/customs/useHooks'
import DialogPanel from './DialogPanel'
import { fetchSongsByAlbumId, fetchSongsByPlaylistId } from '../../actions/queryTable'
import { usePlay } from '../../hook/customs/useHooks'
const useStyles = makeStyles({
    root: {
        position: 'relative',

    },
    cardActionArea: {
        borderColor: '#ab0f24',
    },
    title: {
        fontSize: '1rem',
        maxHeight: '45px'
    },
    cardAreaStyle: {
        maxHeight: '150px'
    },
    overlayButton: {
        position: 'absolute',
        top: '35%',
        left: '20%'
    },

    coverdivimg: {
        boxShadow: '0px 5px 10px #d60446',
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        maxHeight: '200px',
        minHeight : '200px'
    },
    img: {
        '&:hover': {
            transform: 'scale(1.5) rotate(25deg)',
        },
        transition: 'transform .5s ease-in-out',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        minHeight:'inherit',
    },
    cardTitle: {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
})
/**
 * 
 * @param {*
 *  card : {
 *  id : string,
 *  cover : string,
 *  title : string ,
 *  description : string,
 *  premium : true | false,
 *  },
 *  isFav : true | false
 * } param0 
 */
export const CardPanel = ({ card, isFav, linkTo }) => {
    const { selections, dispatchAccount, dispatchSelect } = useContext(AppContext)
    const [openDialog, setOpenDialog] = useState(false)
    const [isShowButton, setIsShowButton] = useState(false)
    const classes = useStyles()
    const [isFavCard, setisFav, setshouldUpdate] = useFavStatus(card.type, card.data, card.id,
        dispatchAccount, isFav)
    const history = useHistory()
    const playHook = usePlay(card.id, { info: card.data, id: card.id, type: card.type })
    const onYesClick = useCallback((e) => {
        e.stopPropagation()
        setOpenDialog(false)
        setshouldUpdate(true)
        setisFav(!isFav)

    }, [])
    const onCloseClick = useCallback((e) => {
        e.stopPropagation()

        setOpenDialog(false)

    }, [])
    const onChangeFav = (e) => {
        e.stopPropagation()
        setOpenDialog(true)

    }
    console.log('card panel ren', playHook.playing.songs.length)
    const onPlaySongs = (e) => {
        e.stopPropagation()
        console.log('play pressed')
        if (playHook.playing.songs.length === 0) {
            console.log(playHook.playing.songs)
            if (card.type === 'album') {

                fetchSongsByAlbumId(card.id).then(res => {

                    playHook.fetchSongs(res)
                })
            }
            else {
                fetchSongsByPlaylistId(card.id).then(res => {
                    playHook.fetchSongs(res)
                })
            }
        }
        else {
            playHook.play()
        }
    }
    const onPauseSongs = (e) => {
        e.stopPropagation()
        console.log('pause pressed')
        playHook.pause()
    }

    return (
        <div className={classes.root}
            onMouseEnter={() => setIsShowButton(true)}
            onMouseLeave={() => setIsShowButton(false)}
            onClick={() => { !openDialog && history.push(linkTo) }}
        >
            <DialogPanel
                title={`Delete ${card.type}`}
                content={`Do you really want to remove this ${card.type} ?`}
                yesText='Delete' noText='No' isOpen={openDialog}
                onYesClick={onYesClick}
                onCloseClick={onCloseClick}
            />
            <div className={classes.coverdivimg}>
                <img src={card.cover} alt='card img' className={classes.img} />
            </div>
            {
                (isShowButton || playHook.playing.isPlaying) && (
                    <div className={classes.overlayButton}>
                        <IconButton onClick={onChangeFav} >
                            <FavoriteIcon color={isFavCard ? 'secondary' : 'inherit'} />
                        </IconButton>

                        {
                            playHook.playing.isPlaying ?
                                (<IconButton onClick={onPauseSongs}>
                                    <img src='/images/playing.gif' alt='playing gif' />
                                </IconButton>)
                                :
                                (<IconButton onClick={onPlaySongs}>
                                    <PlayArrowIcon />
                                </IconButton>)
                        }

                        <IconButton>
                            <StarSharpIcon style={{ color: card.premium ? '#ebf200' : 'inherit' }} />
                        </IconButton>
                    </div>
                )
            }
            <div className={classes.cardTitle}>{card.title}</div>
        </div >

    );
}
export default React.memo(CardPanel)

