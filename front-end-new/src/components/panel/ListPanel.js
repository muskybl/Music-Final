import React, { useContext, useEffect, useMemo, useState } from 'react'
import AppContext from '../../context/app-context'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import StarSharpIcon from '@material-ui/icons/StarSharp'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ACTION } from '../../mylib/constant/constStr'
import { checkFav } from '../../mylib/supports/functions'
import IconButton from '@material-ui/core/IconButton'
import { useFavStatus } from '../../hook/customs/useHooks'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import ROUTE from '../../mylib/constant/route'
import PauseIcon from '@material-ui/icons/Pause'
const img = {
    width: '100%',
    height: '100%',
}
const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        textAlign: 'center',
        margin: 'auto'
    },
    img: {
        ...img
    },
    imgSpin: {
        ...img,
        animation: `spin 8s linear infinite`,
    },
    info: {
        fontSize: '25px',
        maxHeight: '80px'
    },
    subInfo: {
        marginTop: '10px',
        fontSize: '20px',
    },
    playButton: {
        marginTop: '25px',
    },
    coverdivimg: {
        display: 'inline-block',
        position: 'relative',
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        borderRadius: '50%',
    }
}))
/**
 * Detail left hand : album, playlist, etc...
 */
const ListPanel = ({ type }) => {
    const { account, dispatchAccount, selections, dispatchSelect } = useContext(AppContext)
    const { parent, songs } = selections.selecting
    const classes = useStyles()
    const isSame = parent.id === selections.selected.parent.id
    const isPlaying = selections.isPlaying && isSame
    const audioInst = selections.audioInst
    const [isFav, setisFav, setshouldUpdate] = useFavStatus(type, parent.info, parent.id,
        dispatchAccount,
        checkFav(type, account, parent.id))

    const history = useHistory()

    const playAll = () => {
        console.log('play all')        
        dispatchSelect({ type: isSame ? ACTION.PLAY_INDEX : ACTION.PLAY_SONGS, index: 0 })
        audioInst.togglePlay()
    }

    const onChangeFav = (e) => {
        e.stopPropagation()
        setshouldUpdate(true)
        account.profile.email !== '' ? setisFav(!isFav) : history.push(ROUTE.SIGN_IN)
    }

    const isActive = useMemo(() => {
        const current = selections.playIndex
        if (current < 0) return false
        return parent.id === selections.selected.parent.id && selections.isPlaying
    }, [selections])

    useEffect(() => {
        setshouldUpdate(false)
        setisFav(checkFav(type, account, parent.id))
    }, [account, selections])
    const handlePlayall = () => {
        if (isPlaying) {
            dispatchSelect({ type: ACTION.SET_PLAY, data: false })
            audioInst.togglePlay()
        }
        else playAll()
    }
    return (
        // 
        <div className={classes.root}>
            <div className={classes.coverdivimg}>
                <img src={parent.info.cover} alt='List panel' className={isActive ? classes.imgSpin : classes.img} />
            </div>
            <div className={classes.info}>{parent.info.title}</div>
            <Button className={classes.playButton} onClick={handlePlayall} color='secondary' variant='contained'
                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}>Play all</Button>
            <div className={classes.subInfo}>{songs.length} songs</div>
            <div>
                <IconButton onClick={onChangeFav}>
                    <FavoriteIcon color={isFav ? 'secondary' : 'inherit'} />
                </IconButton>
                <IconButton>
                    <StarSharpIcon style={{ color: parent.info.premium ? '#ebf200' : 'inherit' }} />
                </IconButton>
            </div>
        </div>

    )
}
export default React.memo(ListPanel) 