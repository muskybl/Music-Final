import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import StyleLink from '../row/StyleLink'
import Paper from '@material-ui/core/Paper'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import matches from 'validator/lib/matches'
import isLength from 'validator/lib/isLength'
import { signUp } from '../../actions/account'
import AppContext from '../../context/app-context'
import { ACTION } from '../../mylib/constant/constStr'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import { MESSAGE } from '../../mylib/constant/constStr'
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
    )
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

export default function SignUp() {
    let history = useHistory()
    
    const classes = useStyles()
    const [isRemember, setRemember] = useState(true)
    const [firstName, setFN] = useState({ helperText: '', value: '' })
    const [lastName, setLN] = useState({ helperText: '', value: '' })
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
    const handleClose = () => {
        setSnackBar({ ...snackBar, open: false });
    }
    const signUpSuccess = (message) => {
        setSnackBar({ ...snackBar, open: true, message })
        setTimeout(() => {
            history.push('/')
        }, 1000)
    }

    const signUpFail = (message) => {
        setSnackBar({ ...snackBar, open: true, message })
    }
    const preSubmit = () => {
        return !(
            firstName.helperText !== '' || lastName.helperText ||
            email.helperText !== '' || password.helperText !== '')
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (!preSubmit()) {
            setSnackBar({ ...snackBar, open: true, message: MESSAGE.INVALID_INPUTS })
        }
        signUp({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            isRemember
        }).then(res => {
            console.log(res)
            var { status, data } = res
            const message = data.message
            delete data.message
            if (status === 200) {
                dispatchAccount({ type: ACTION.SIGN_UP, data })
                signUpSuccess(message)
            }
            else {
                signUpFail(message)
            }

        }).catch(err => console.log(err))
    }
    const onFirstNameChange = (value) => {
        if (matches(value, "^[a-zA-Z ]*$")) setFN({ helperText: '', value })
        else setFN({ helperText: MESSAGE.INVALID_NAME, value })
    }
    const onLastNameChange = (value) => {
        if (matches(value, "^[a-zA-Z ]*$")) setLN({ helperText: '', value })
        else setLN({ helperText: MESSAGE.INVALID_NAME, value })

    }
    const onEmailChange = (value) => {
        if (isEmail(value)) setE({ helperText: '', value })
        else setE({ helperText: MESSAGE.INVALID_EMAIL, value })
    }
    const onPasswordChange = (value) => {
        if (!isEmpty(value) && isLength(value, { min: 7, max: 50 })) setP({ helperText: '', value })
        else setP({ helperText: MESSAGE.INVALID_PASSWORD, value })
    }
    useEffect(() => {
    }, [firstName, lastName, email, password, isRemember])
    return (
        <Container component="main" style={{ maxWidth: "570px" }}>
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
                        Sign up
        </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    color='secondary'
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={firstName.helperText === '' ? false : true}
                                    helperText={firstName.helperText}
                                    value={firstName.value}
                                    onChange={e => onFirstNameChange(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    color='secondary'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    error={lastName.helperText === '' ? false : true}
                                    helperText={lastName.helperText}
                                    onChange={e => onLastNameChange(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    color='secondary'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={email.helperText === '' ? false : true}
                                    helperText={email.helperText}
                                    onChange={(e) => onEmailChange(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    color='secondary'
                                    variant="outlined"
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
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={isRemember} color='secondary' onChange={() => setRemember(!isRemember)} />}
                                    label="Remember me"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <StyleLink to='/signIn' variant="body2">
                                    Already have an account? Sign in
                                </StyleLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Paper>
        </Container>
    );
}