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
import SongPanel from '../panel/SongsPanel'
import { ACTION } from '../../mylib/constant/constStr'
import AppContext from '../../context/app-context'
import { search } from '../../actions/homePage'
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

const SearchInfo = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { keyword } = useParams()
    const [searchInfo, setSearchInfo] = useState({
        artists: [],
        songs: [],
        albums: [],
        playlists: [],
        emotionSongs: [],
        suggestSongs: []
    })
    const { dispatchSelect } = useContext(AppContext)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

    useEffect(() => {
        document.title = `Turn up - ${keyword}`
        var mounted = true
        search(keyword).then(res => {
            console.log(res)
            if (mounted) setSearchInfo(res)
        })
        return () => mounted = false
    }, [keyword])

    useEffect(() => {
        dispatchSelect({
            type: ACTION.SELECTING_SONGS,
            data: (searchInfo.songs).concat(searchInfo.emotionSongs).concat(searchInfo.suggestSongs),
            parent: {
                id: keyword,
                type: 'search-info',
                info: {}
            }
        })
    }, [searchInfo])

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
                    <SongPanel isFull={true} dataSongs={searchInfo.songs} />
                    <SongPanel
                        isFull={true} title='Emotions'
                        dataSongs={searchInfo.emotionSongs} startIndex={searchInfo.songs.length} />
                    <SongPanel
                        isFull={true} title='More suggestion'
                        dataSongs={searchInfo.suggestSongs} startIndex={searchInfo.emotionSongs.length+1} />

                    <HorizontalList title="Albums" lists={searchInfo.albums} type="albums" />
                    <HorizontalList title="Playlists" lists={searchInfo.playlists} type="playlists" />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabPanel}>
                <div>
                    <SongPanel />
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction} className={classes.tabPanel}>
                <HorizontalList title="Albums" lists={searchInfo.albums} type="albums" />
                <HorizontalList title="Playlists" lists={searchInfo.playlists} type="playlists" />
            </TabPanel>
            {/* </SwipeableViews> */}
        </div>
    )
}

export default React.memo(SearchInfo)