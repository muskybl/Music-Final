import React, { useState, useEffect, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import StyleLink from '../row/StyleLink'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { signIn } from '../../actions/account'
import AppContext from '../../context/app-context'
import { ACTION } from '../../mylib/constant/constStr'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import { MESSAGE } from '../../mylib/constant/constStr'

import { StatusCodes } from 'http-status-codes'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <StyleLink color="inherit" to='/'>
        turnupmusic.com
      </StyleLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory()
  const classes = useStyles();
  const [isRemember, setRemember] = useState(true)
  const [email, setE] = useState({ helperText: '', value: '' })
  const [password, setP] = useState({ helperText: '', value: '' })
  const { dispatchAccount } = useContext(AppContext)
  const [snackBar, setSnackBar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: ''
  })
  const { vertical, horizontal, open, message } = snackBar

  const signInSuccess = (message) => {
    setSnackBar({ ...snackBar, open: true, message })

    setTimeout(() => {
      history.push('/')
    }, 1000)
  }

  const signInFail = (message) => {
    setSnackBar({ ...snackBar, open: true, message })
  }
  const handleClose = () => {
    setSnackBar({ ...snackBar, open: false });
  }
  const preSubmit = () => {
    return (email.helperText !== '' || password.helperText !== '' ||
      email.value.length === 0 || password.value.length === 0
    )
  }
  const onSubmit = (e) => {

    e.preventDefault()

    if (preSubmit()) {
      setSnackBar({ ...snackBar, open: true, message: MESSAGE.INVALID_INPUTS })
      return
    }

    signIn({
      email: email.value,
      password: password.value,
      isRemember
    }).then(res => {
      if (res.status === StatusCodes.OK) {
        signInSuccess(res.data.message)
        delete res.data.message        
        dispatchAccount({ type: ACTION.SIGN_IN, data: res.data })
      }
      else signInFail(res.data.message)
    }).catch(err => console.log(err))

  }
  const onEmailChange = (value) => {
    setE({ helperText: isEmail(value) ? '' : MESSAGE.INVALID_EMAIL, value })
  }
  const onPasswordChange = (value) => {
    setP({ helperText: (!isEmpty(value) && isLength(value, { min: 7, max: 50 })) ? '' : MESSAGE.INVALID_PASSWORD, value })

  }
  useEffect(() => {

  }, [isRemember, email, password])
  return (
    <Container component="main" style={{ maxWidth: "500px" }}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert severity='info'>{message}</Alert>
      </Snackbar>
      <Paper style={{ padding: '50px' }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              color='secondary'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={email.helperText === '' ? false : true}
              helperText={email.helperText}
              onChange={(e) => onEmailChange(e.target.value)}
            />
            <TextField
              color='secondary'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={password.helperText === '' ? false : true}
              helperText={password.helperText}
              onChange={e => onPasswordChange(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox color='secondary' onChange={() => setRemember(!isRemember)} checked={isRemember} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <StyleLink to='/' variant="body2">
                  Forgot password?
              </StyleLink>
              </Grid>
              <Grid item>
                <StyleLink to='/signUp' variant="body2">
                  {"Don't have an account? Sign Up"}
                </StyleLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Paper>
    </Container>

  );
}