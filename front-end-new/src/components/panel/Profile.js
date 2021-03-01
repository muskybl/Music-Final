import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CardPanel from './CardPanel'
import Grid from '@material-ui/core/Grid'
import AppContext from '../../context/app-context'
import AccPanel from './AccPanel'
import { trySignInByToken } from '../../actions/account'
import { ACTION, ACTION_PREFIX } from '../../mylib/constant/constStr'
import Button from '@material-ui/core/Button'
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { addPlaylist } from '../../actions/account'
import FavSong from './FavSong'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0} style={{ paddingLeft: '20px' }}>
                    <Typography component={'span'} >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    body: {
        margin: 0,
        '@media print': {
            backgroundColor: theme.palette.common.white,
        },
    },
    root: {
        flexGrow: 1,
        display: 'flex',
        height: 1000,
        borderRadius: '6px',
    },
    tabs: {
        borderRight: `2px solid ${theme.palette.divider}`,
        minWidth: '15%',
        maxWidth: '15%'
    },
    tab: {
        '&:hover': {
            background: "#db3a4b",
            // borderRadius: '4px'
        },
    },
    tabSelected: {
        backgroundColor: '#b02236',
        // borderRadius: '4px'
    },
    tabPanel: {
        // overflow: 'auto',
        width: 'inherit'
    },
    muiboxRoot: {
        padding: '0px'
    }
}));

export const Profile = () => {
    const { account, dispatchAccount } = useContext(AppContext)
    const [addPl, setAddPl] = useState('')
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [open, toggleOpen] = React.useState(false);

    useEffect(() => {
        console.log('profile sign', account.favAlbums)
        if (account.profile.account_id === null) {
            console.log('new data')
            trySignInByToken().then(res => dispatchAccount({ type: ACTION.SIGN_IN_BY_TOKEN, data: res }))
        }
    }, [account, dispatchAccount])

    const handleClose = () => {
        setAddPl('')
        toggleOpen(false)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        handleClose()
    }
    const addFavPl = () => {
        console.log(addPl)
        if (addPl != null) {
            addPlaylist(addPl).then(res => {
                dispatchAccount({ type: ACTION_PREFIX.ADD_ + ACTION.USER_PLAYLISTS, data: res.playlist })
            })
            toggleOpen(false)
        }
    }

    return (
        // <Paper>
        <div className={classes.body}>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >

                    <Tab label="Profile" {...a11yProps(0)} className={value === 0 ? classes.tabSelected : classes.tab} />
                    <Tab label="Songs" {...a11yProps(1)} className={value === 1 ? classes.tabSelected : classes.tab} />
                    <Tab label="Albums" {...a11yProps(2)} className={value === 2 ? classes.tabSelected : classes.tab} />
                    <Tab label="Playlist" {...a11yProps(3)} className={value === 3 ? classes.tabSelected : classes.tab} />

                </Tabs>
                <div style={{ width: '100%' }}>
                    <TabPanel index={0} value={value} className={classes.tabPanel} >
                        <div >
                            <Typography variant='h6'>Profile</Typography>
                            <AccPanel />
                        </div>
                    </TabPanel>
                    <TabPanel index={1} value={value} className={classes.tabPanel} >
                        <div >
                            {/* <Typography variant='h6'>Songs</Typography> */}
                            <FavSong />
                        </div>
                    </TabPanel>

                    <TabPanel index={2} value={value} className={classes.tabPanel} >
                        <div style={{ marginBottom: '8px' }}>Albums</div>
                      
                        <Grid container spacing={3}>
                            <Grid container item xs={12} spacing={3} >
                                {

                                    account.favAlbums.map(album =>
                                        <Grid item xs={3} key={album.album_id}>
                                            <CardPanel
                                                action={ACTION.FAV_ALBUMS}
                                                isFav={true}
                                                linkTo={`/albums/${album.album_id}/songs`}
                                                card={{
                                                    data: album,
                                                    id: album.album_id,
                                                    title: album.title,
                                                    cover: album.cover,
                                                    premium: album.premium,
                                                    type: 'album'
                                                }} />
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                        
                    </TabPanel>
                    <TabPanel index={3} value={value} className={classes.tabPanel} >

                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <form onSubmit={handleSubmit}>
                                <DialogTitle id="form-dialog-title">Add a new playlist</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter your playlist name
                                </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        value={addPl}
                                        onChange={(event) => setAddPl(event.target.value)}
                                        label="title"
                                        type="text"
                                        color='secondary'
                                    />

                                </DialogContent>
                                <DialogActions>
                                    <Button type="submit" color='secondary' variant="contained" onClick={addFavPl}>
                                        Add
                                    </Button>
                                    <Button onClick={handleClose} color='secondary' variant="contained">
                                        Cancel
                                    </Button>

                                </DialogActions>
                            </form>
                        </Dialog>
                        <Button
                            onClick={() => toggleOpen(true)}
                            variant="contained" color='secondary'
                            style={{ marginBottom: '8px' }}
                            startIcon={<AddCircleOutlineSharpIcon />}
                        >Playlists</Button>
                        <Grid container spacing={3}>
                            <Grid container item xs={12} spacing={3} >
                                {

                                    account.favPlaylists.concat(account.userPlaylists).map(playlist =>
                                        <Grid item xs={3} key={playlist.playlist_id}>
                                            <CardPanel
                                                action={ACTION.FAV_PLAYLISTS}
                                                isFav={true}
                                                linkTo={`/playlists/${playlist.playlist_id}/songs`}
                                                card={{
                                                    data: playlist,
                                                    id: playlist.playlist_id,
                                                    title: playlist.title,
                                                    cover: playlist.cover,
                                                    premium: playlist.premium,
                                                    type: 'playlist'
                                                }} />
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </TabPanel>
                </div>
            </div>
        </div >
        // </Paper>
    )
}
export default React.memo(Profile)