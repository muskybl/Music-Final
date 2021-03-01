import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import SlideCard from '../panel/SlideCard'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '40px',
        marginTop: '20px',
        marginBottom: '5px',
        color: '#d60446',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        padding: '5px',
        scrollBehavior: 'smooth',
        overflow: 'moz-scrollbar-none',
        height: '240px'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '55px'
    },
    item: {
        marginTop: '22px',
        display: 'flex',
        flexShrink: 0,
    },
    divider: {
        display: 'flex',
        flex: 1,
    }

}))
const HorizontalList = ({ title, lists, type }) => {
    const classes = useStyles();
    const gridRef = useRef()
    const leftArrow = useRef()
    const rightArrow = useRef()
    const isAlbum = type === 'albums'
    useEffect(() => {
        console.log('album rerender')
    }, [])
    const onScrollLeft = () => {
        if (gridRef.current.scrollLeft !== 0) {
            leftArrow.current.disabled = false
            gridRef.current.scrollTo(gridRef.current.scrollLeft - 1000, 0)

        }
        else leftArrow.current.disabled = true
    }
    const onScrollRight = () => {
        const maxScroll = gridRef.current.scrollWidth - gridRef.current.clientWidth
        if (gridRef.current.scrollLeft < maxScroll) {
            rightArrow.current.disabled = false
            gridRef.current.scrollTo(gridRef.current.scrollLeft + 1000, 0)
        }
        else rightArrow.current.disabled = true

    }
    return (
        <div>
            <div className={classes.container}>
                <div style={{
                    fontSize: '26px',
                    // marginTop: '20px',
                    marginBottom: '0px',
                    color: '#d60446',
                }} className={classes.item}>{title} ({lists.length})</div>

                <div className={classes.divider}></div>

                <div className={classes.item}>
                    <IconButton onClick={onScrollLeft} ref={leftArrow} >
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton onClick={onScrollRight} ref={rightArrow} >
                        <ChevronRightIcon />
                    </IconButton>
                </div>
            </div>
            <GridList className={classes.gridList} cols={4} ref={gridRef}>

                {lists.map((child) => (

                    <SlideCard
                        key={isAlbum ? child.album_id : child.playlist_id}
                        item={{
                            id: isAlbum ? child.album_id : child.playlist_id,
                            cover: child.cover,
                            title: child.title,
                            premium: child.premium
                        }}
                        linkTo={`/${type}/${isAlbum ? child.album_id : child.playlist_id}/songs`}
                        type
                    />

                ))}
            </GridList>


        </div>
    )
}
export default React.memo(HorizontalList)
