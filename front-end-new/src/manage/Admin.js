import React, { useState, useEffect, useCallback, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { progressBar, Snack } from '../mylib/supports/jsxStyle'
import { LinearProgress } from '@material-ui/core'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import DataTable from './DataTable'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { useProgress } from '../hook/customs/useHooks'
import TableFormat from './TableFormat'
import admin from '../actions/admin'
import cookies from 'js-cookie'
import AppContext from '../context/app-context'
import { ACTION } from '../mylib/constant/constStr'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddSong from './AddSong'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
const drawerWidth = 240;
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,

        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}));
export default function Admin() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [chosePage, setPage] = useState(-1);
    const [selected, setSelected] = useState(-1)
    const [previousAlbums, setPA] = useState([])
    const [previousPlaylists, setPP] = useState([])
    const [previousSongs, setPS] = useState([])
    const [previousAccounts, setPAc] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [songs, setSongs] = useState([])
    const [accounts, setAccounts] = useState([])
    const [snack, setSnack] = useState({
        message: '',
        status: '',
        open: false,
    })
    const { dispatchAccount } = useContext(AppContext)
    const setLoading = useProgress()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log('render admin')
        setLoading(false)
        Promise.all([
            admin.getAllAlbums(), admin.getAllPlaylists(),
            admin.getAllSongs(), admin.getAllAccounts()]).then(results => {
                setAlbums(results[0])
                setPlaylists(results[1])
                setSongs(results[2])
                setAccounts(results[3])
            }).catch(err => console.log(err))
    }, [])
    const closeSnack = useCallback(() => {
        setSnack({
            message: '',
            status: '',
            open: false,
        })
    }, [snack])

    useEffect(() => {

    }, [albums])
    const handleLogout = (event) => {
        setLoading(false)
        cookies.remove('token', { path: '/' })
        dispatchAccount({ type: ACTION.SIGN_OUT })
        // handleClose(event)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Snack mess={snack.message} status={snack.status}
                isOpenSnack={snack.open} onSnackClose={closeSnack}
            />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <LinearProgress color='secondary' style={{ ...progressBar }} id="progress" />
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItem
                        button key={'Albums/Playlists'}
                        selected={selected === 0}
                        onClick={() => {
                            setSelected(0)
                            setPage(1)
                        }}>
                        <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
                        <ListItemText primary={'Albums/Playlists'} />
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem
                        button key={'Accounts'}
                        selected={selected === 1}
                        onClick={() => {
                            setSelected(1)
                            setPage(2)
                        }}>
                        <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                        <ListItemText primary={'Accounts'} />
                    </ListItem>
                </List>
                <List>
                    <ListItem
                        button key={'Songs'}
                        selected={selected === 2}
                        onClick={() => {
                            setSelected(2)
                            setPage(2)
                        }}>
                        <ListItemIcon><QueueMusicIcon /></ListItemIcon>
                        <ListItemText primary={'Songs'} />
                    </ListItem>
                </List>
                <List>
                    <ListItem
                        button key={'Add Song'}
                        selected={selected === 3}
                        onClick={() => {
                            setSelected(3)
                            setPage(3)
                        }}>
                        <ListItemIcon><AddToPhotosIcon /></ListItemIcon>
                        <ListItemText primary={'Add Song'} />
                    </ListItem>
                </List>
                <List>
                    <ListItem
                        button key={'Logout'}
                        selected={selected === 4}
                        onClick={() => {
                            handleLogout()
                        }}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>
                </List>

            </Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <div >
                    <TabPanel index={0} value={selected} className={classes.tabPanel} >
                        <div >
                            <DataTable
                                previousSelected={previousAlbums}
                                updateState={setPA}
                                title='Albums'
                                dataRows={albums}
                                obj={TableFormat.AlbumsObj}
                                headCells={TableFormat.AlbumHeadCells}
                                deleteRows={admin.deleteAlbums}

                            />
                        </div>
                        <div >
                            <DataTable
                                previousSelected={previousPlaylists}
                                updateState={setPP}
                                title='Playlists'
                                dataRows={playlists}
                                obj={TableFormat.PlaylistsObj}
                                headCells={TableFormat.PlaylistHeadCells}
                                deleteRows={admin.deletePlaylists}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel index={1} value={selected} className={classes.tabPanel} >
                        <DataTable
                            previousSelected={previousAccounts}
                            updateState={setPAc}
                            title='Accounts'
                            dataRows={accounts}
                            obj={TableFormat.AccountsObj}
                            headCells={TableFormat.AccountHeadCells}
                            deleteRows={admin.deletePlaylists}
                        />
                    </TabPanel>
                    <TabPanel index={2} value={selected} className={classes.tabPanel} >
                        <DataTable
                            previousSelected={previousSongs}
                            updateState={setPS}
                            title='Songs'
                            dataRows={songs}
                            obj={TableFormat.SongsObj}
                            headCells={TableFormat.SongHeadCells}
                            deleteRows={admin.deletePlaylists}
                        />
                    </TabPanel>
                    <TabPanel index={3} value={selected} className={classes.tabPanel} >
                        <AddSong albums={albums} uploadSong={admin.uploadSong} setSnack={setSnack}/>
                    </TabPanel>

                </div>
            </div>
        </div>
    );
}
