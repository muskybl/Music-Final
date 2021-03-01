import React, { useEffect, useMemo, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Account from '../../components/home/Account'
import { LinearProgress } from '@material-ui/core'
import { progressBar } from '../../mylib/supports/jsxStyle'
import PopoverMenus from '../panel/PopoverMenus'
import Search from './Search'
import { GENRES } from '../../mylib/constant/constStr'

import '../../mylib/supports/CSSClass.css'
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    marginTop: '100px',
  },
  appBar: {
    boxShadow: '1px 1px 1px #d60446',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 100,
    width: '80%',
    marginLeft: '131px',
    justifyContent: 'space-between'
  },
  title: {
    flex: 'left',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '50px',
    height: '65%'
    // marginLeft: '50px'
  },
  search: {
    flex: 'right'
    // cursor: 'pointer',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputRoot: {
    color: 'inherit',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    paddingTop: '20px'
  },
  wrapLogo: {
    height: '100px',
    marginLeft: "auto",
    marginRight: "auto"
  },
  logo: {
    width: '75%',
    float: "left"
  },
  brandName: {
    width: '25%',
    float: "left"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Child = React.memo(({ darkMode, genres }) => {
  const classes = useStyles()
  const history = useHistory()




  return (

    <div className={classes.root}>

      <AppBar color="inherit" className={classes.appBar} id='appbar'>
        <LinearProgress color='secondary' style={{ ...progressBar }} id="progress" />
        {/* className={classes.toolbar} */}
        <Toolbar >
          <div style={{ display: 'flex', marginTop: '1%', marginLeft: '2%' }}>
            <div style={{ width: '6%' }}>
              <img
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                src={'/images/logo.png'} alt='logo'
                onClick={() => history.push('/')}
              />
            </div>
            <div >
              <div style={{ display: 'flex', marginLeft: '3%' }}>
                <div style={{ display: 'flex', marginTop: '2.5%', marginLeft: '3%' }}>

                  <Typography className={classes.title + ' '+ 'menu'} noWrap onClick={() => history.push('/')}>
                    HOME PAGE
                  </Typography>
                  <Typography className={classes.title + ' ' + 'menu'} noWrap>
                    CHARTS
                  </Typography>
                  <Typography className={classes.title + ' ' + 'menu'} noWrap onClick={() => history.push('/newest')}>
                    NEWS
                  </Typography>
                  <Typography className={classes.title + ' ' + 'menu'} noWrap>
                    ALBUMS
                  </Typography>

                  <div id='GENRES' className={classes.title + ' ' + 'menu'}>
                    <PopoverMenus title='GENRES' lists={genres} />
                  </div>
                </div>
                <div style={{ display: 'flex', marginLeft: '18%' }}>
                  <div className={classes.search} >
                    <Search />
                  </div>
                  <IconButton aria-label="display more actions" edge="end" color="inherit" style={{ flex: 'right' }}>
                    <Account />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>

  );
})
export default function ProminentAppBar() {  
  const genres = useMemo(() => {
    return GENRES.map(genre => {
      return { content: genre, link: `/search/${genre}` }
    })
  }, [])
  return (
    <Child genres={genres} />
  )
}
