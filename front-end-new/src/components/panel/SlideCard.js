import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '260px',
        height: '200px',
        padding: '7px',
        cursor: 'pointer',
    },
    parentImg: {
        height: '175px',
        width: '200px',
        boxShadow: '0px 5px 10px #d60446',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
    },
    title: {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '200px',
        fontSize: '20px',
        
    }

}))
const SlideCard = ({ item, linkTo }) => {

    const classes = useStyles()
    const history = useHistory()
    return (
        <div className={classes.root}>
            <div onClick={() => {
                history.push(linkTo)
            }} className={classes.parentImg}>
                <img src={item.cover} alt={item.title} className={classes.img} />
            </div>
            <div className={classes.title}>{item.title}</div>
        </div>
    )
}

export default React.memo(SlideCard)