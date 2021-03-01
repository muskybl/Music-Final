import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import HorizontalList from './HorizontalList'
import { useParams } from 'react-router-dom'
import { fetchArtistInfo } from '../../actions/queryTable'
import SongPanel from '../panel/SongsPanel'
import { ACTION } from '../../mylib/constant/constStr'
import AppContext from '../../context/app-context'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0} >
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
//theme.palette.background.paper
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'inherit',
        // width: '100%',
        willChange: 'auto'
    },
    tab: {
        fontFamily: 'Roboto',
        // fontWeight: '1000'
    },
    tabPanel: {
        overflow: 'hidden'
        // width: '1000px'
    },
}));

export default function Artists() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { id } = useParams()
    const [artistInfo, setArtistInfo] = useState({
        artist: {},
        songs: [],
        albums: [],
        playlists: []
    })
    const { dispatchSelect } = useContext(AppContext)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

    useEffect(() => {
        console.log('id renr', id)
        var mounted = true
        fetchArtistInfo(id).then(res => {
            if (mounted) setArtistInfo(res)

        })
        return () => mounted = false
    }, [id])

    useEffect(() => {
        
        dispatchSelect({
            type: ACTION.SELECTING_SONGS, data: artistInfo.songs,
            parent: {
                id: artistInfo.artist.artist_id,
                type: 'songs-artists',
                info: {}
            }
        })
    }, [artistInfo])

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    centered
                >
                    <Tab label="Overview" {...a11yProps(0)} className={classes.tab} />
                    <Tab label="Songs" {...a11yProps(1)} className={classes.tab} />
                    <Tab label="Albums/Playlists" {...a11yProps(2)} className={classes.tab} />
                    <Tab label="Detail" {...a11yProps(3)} className={classes.tab} />
                </Tabs>
            </AppBar>
           
            <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabPanel}>
                <div>
                    <div>
                        <h6 style={{
                            fontSize: '30px',
                            marginTop: '20px',
                            marginBottom: '0px',
                            color: '#d60446',
                        }} >Songs</h6>
                        <SongPanel />
                    </div>
                    <HorizontalList title="Albums" lists={artistInfo.albums} type="albums" />
                    <HorizontalList title="Playlists" lists={artistInfo.playlists} type="playlists" />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabPanel}>
                Item Two
                </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction} className={classes.tabPanel}>
                Item Three
                </TabPanel>
            {/* </SwipeableViews> */}
        </div>
    );
}