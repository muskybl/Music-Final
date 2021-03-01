import React, { useReducer, useEffect, useState, useCallback } from 'react'
import { ACTION, HOST_ADDRESS, ROUTER } from '../mylib/constant/constStr'
import Brightness7SharpIcon from '@material-ui/icons/Brightness7Sharp'
import Brightness4SharpIcon from '@material-ui/icons/Brightness4Sharp'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../components/home/Header'
import Admin from '../manage/Admin'
import AppContext from '../context/app-context'
import { homePageReducer, defaultHomePageState } from '../reducers/homePage'
import { accountReducer, defaultAccount } from '../reducers/account'
import { selectionsReducer, defaultSelections } from '../reducers/selections'
import { snackReducer, defaultSnack } from '../reducers/snack'
import { loadHomePage } from '../actions/homePage'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import GroupSongs from '../components/lists/GroupSongs'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Fab } from '@material-ui/core'
import ReactJkMusicPlayer from "react-jinke-music-player"
import { musicPlayerOptions } from '../mylib/constant/options'
import { songsPipeMusicPlayer, premiumDate } from '../mylib/supports/functions'
import { post } from '../mylib/supports/httpMethods'
import 'react-jinke-music-player/assets/index.css'
import SignIn from '../components/home/SignIn'
import SignUp from '../components/home/SignUp'
import Newest from '../components/home/Newest'
import { trySignInByToken } from '../actions/account'
import Profile from '../components/panel/Profile'
import Pricing from '../components/panel/Pricing'
import Home from '../components/home/Home'
import { useProgress } from '../hook/customs/useHooks'
import ROUTE from '../mylib/constant/route'
import { Snack } from '../mylib/supports/jsxStyle'
import SearchInfo from '../components/home/SearchInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '77%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '15%',
    marginTop: '10%',
  },
  fabDarkMode: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: '50px',
    left: 'auto',
    position: 'fixed',
  },
  fabBackToTop: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: '110px',
    left: 'auto',
    position: 'fixed',
  },

}))
const setIcon = () => {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = '../../public/images/logo.png'
  document.getElementsByTagName('head')[0].appendChild(link);
}

const App = () => {
  const [homePage, dispatchHomePage] = useReducer(homePageReducer, defaultHomePageState)
  const [account, dispatchAccount] = useReducer(accountReducer, defaultAccount)
  const [selections, dispatchSelect] = useReducer(selectionsReducer, defaultSelections)
  const [snack, dispatchSnack] = useReducer(snackReducer, defaultSnack)
  const [theme, setTheme] = useState(true)
  const appliedTheme = createMuiTheme(theme ? dark : light)
  let history = useHistory()
  const setLoading = useProgress()

  useEffect(() => {

    console.log('app render: ')
    let mounted = true
    setLoading(true)
    Promise.all([loadHomePage(), trySignInByToken()]).then(results => {
      if (mounted) {
        setIcon()
        dispatchHomePage({ type: ACTION.LOAD_HOME_PAGE, data: results[0] })
        if (results[1] !== null) dispatchAccount({ type: ACTION.SIGN_IN_BY_TOKEN, data: results[1] })
        setLoading(false)
      }

    })
    return () => mounted = false
  }, [])
  useEffect(() => {
    console.log(history)
    let mounted = true
    if (mounted) {
      // if (account.profile.role === 'admin') 
    }
    return () => mounted = false
  }, [account, history])

  const closeSnack = useCallback(() => {
    dispatchSnack({ type: ACTION.DISABLE_SNACK })
  }, [snack])
  const classes = useStyles();
  return (
    <ThemeProvider theme={appliedTheme} >
      <CssBaseline />
      <AppContext.Provider value={{
        homePage, dispatchHomePage,
        account, dispatchAccount,
        selections, dispatchSelect,
        snack, dispatchSnack
      }}>
        <Snack mess={snack.message} status={snack.status}
          isOpenSnack={snack.open} onSnackClose={closeSnack}
        />
        <ReactJkMusicPlayer
          {...musicPlayerOptions}
          getAudioInstance={(instance) => {
            dispatchSelect({ type: ACTION.GET_AUDIO_INSTANCE, data: instance })
          }}
          mode={selections.isPlaying ? 'full' : 'mini'}
          audioLists={songsPipeMusicPlayer(selections.selected.songs)}
          playIndex={selections.playIndex}
          showLyric={false}
          onAudioPlay={(info) => {
            fetch(`${HOST_ADDRESS}/${ROUTER.SONGS}/${ROUTER.LISTEN}`, post({
              song_id: selections.selecting.songs[info.playIndex].song_id,
              parent_id: selections.selecting.parent.id,
              type: selections.selecting.parent.type
            }))
            dispatchSelect({ type: ACTION.SET_PLAY, data: true })
          }}
          onAudioPause={(_) => dispatchSelect({ type: ACTION.SET_PLAY, data: false })}
          onPlayIndexChange={(index) => {

            const isSongPremium = selections.selected.songs[index].premium
            const isPlayNext = isSongPremium && (account.profile.email === '' || premiumDate(account.profile.expiredDate) > 0)
            dispatchSelect({ type: ACTION.PLAY_INDEX, index: isPlayNext ? index + 1 : index })
          }}
        />
        {
          account.profile.role === 'admin' ? <Admin /> :
            (
              < Router >
                <div className={classes.root}>
                  <div style={{ marginTop: '120px' }} >
                    <a aria-label='top' href='# '> </a>
                    <Header />
                  </div>                  
                  <Fab onClick={() => setTheme(!theme)} size='small' className={classes.fabDarkMode}>
                    {
                      theme ? <Brightness4SharpIcon /> : <Brightness7SharpIcon />
                    }
                  </Fab>
                  <a href={'#top'}>
                    <Fab size='small' className={classes.fabBackToTop}>
                      <KeyboardArrowUpIcon />
                    </Fab>
                  </a>
                  <Switch>
                    <Route path={ROUTE.HOME} exact={true}>
                      <Home />
                    </Route>
                    <Route path={ROUTE.ALBUM_SONGS} exact={true}>
                      <GroupSongs type='album' />
                    </Route>
                    <Route path={ROUTE.PLAYLIST_SONGS} exact={true}>
                      <GroupSongs type='playlist' />
                    </Route>
                    <Route path={ROUTE.SIGN_IN} exact={true}>
                      <SignIn />
                    </Route>
                    <Route path={ROUTE.ADMIN} exact={true}>
                      <Admin />
                    </Route>
                    <Route path={ROUTE.SIGN_UP} exact={true}>
                      <SignUp />
                    </Route>
                    <Route path={ROUTE.NEWEST} exact={true}>
                      <Newest />
                    </Route>
                    <Route path={ROUTE.PROFILE} exact={true} >
                      <Profile />
                    </Route>
                    <Route path={ROUTE.PRICING} >
                      <Pricing />
                    </Route>
                    <Route path={ROUTE.SEARCH} exact={true} >
                      <SearchInfo />
                    </Route>
                  </Switch>
                </div>
              </Router>
            )
        }


      </AppContext.Provider>
    </ThemeProvider >
  );
}
export const light = {
  palette: {
    type: "light"
  },
  typography: {
    fontFamily: 'Alegreya'
  }
};
export const dark = {
  palette: {
    type: "dark"
  },
  typography: {
    fontFamily: 'Alegreya'
  }
}
export default App;

//todo : rewrite controller album 
