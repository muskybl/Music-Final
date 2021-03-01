import React, { useContext, useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import StarSharpIcon from '@material-ui/icons/StarSharp'
import AppContext from '../../context/app-context'
import Divider from '@material-ui/core/Divider'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import { MESSAGE, ACTION } from '../../mylib/constant/constStr'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import matches from 'validator/lib/matches'
import isLength from 'validator/lib/isLength'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'
import Tooltip from '@material-ui/core/Tooltip'
const useStyles = makeStyles({
    accLeftImgPanel: {
        float: 'left',
        width: '28%'
    },
    accRightPanel: {
        float: 'left',
        width: '72%',
        marginTop: '90px',
        cursor: 'pointer'
    },
    clearFix: {
        '&::after': {
            content: "",
            display: 'table',
            clear: 'both',
        }
    },
    divImage: {
        maxHeight: '235px',
        maxWidth: '235px',
        position: 'relative',

    },
    image: {
        width: '100%',
        height: '100%'
    },
    starIcon: {
        position: 'absolute',
        right: '-10%',
        bottom: '-15%',

    },
    attachIcon: {
        position: 'absolute',
        right: '10%',
        bottom: '-5%',
    },
    saveIcon: {
        position: 'absolute',
        right: '75%',
        bottom: '-3%',
    },
    detailInfo: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    rootInput: {
        marginRight: '5%',
        width: '280px'
    },
    coverdivimg: {
        display: 'inline-block',
        position: 'relative',
        width: '225px',
        height: '225px',
        overflow: 'hidden',
        borderRadius: '50%',
    }
    //todo : add price to the bottom
})
const AccPanel = () => {
    const classes = useStyles()
    let history = useHistory()
    const { account, dispatchAccount } = useContext(AppContext)
    const [firstName, setFN] = useState({ helperText: '', value: account.profile.firstName })
    const [lastName, setLN] = useState({ helperText: '', value: account.profile.lastName })
    const [email, setE] = useState({ helperText: '', value: account.profile.email })
    const [password, setP] = useState({ helperText: '', value: '' })
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
    const upfile = (e) => {
        if (e.target.files, e.target.files[0]) {
            const acc_img = document.getElementById("acc_img")
            acc_img.src = URL.createObjectURL(e.target.files[0])
        }
    }
    useEffect(() => {
        setFN({ helperText: '', value: account.profile.firstName })
        setLN({ helperText: '', value: account.profile.lastName })
        setE({ helperText: '', value: account.profile.email })
        //firstName, lastName, email, password
    }, [account])

    const expiredDateLeft = useMemo(() =>
        (moment(account.profile.expiredDate).diff(moment(), 'days')), [account])


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
            >
                <Alert severity='info'>{message}</Alert>
            </Snackbar>
            <div className={classes.accLeftImgPanel}>
                <div className={classes.divImage}>
                    <div className={classes.coverdivimg}>
                        <img id="acc_img" src={account.profile.avatar} alt='account avatar' className={classes.image} />
                    </div>
                    <div>
                        <IconButton className={classes.starIcon}>
                            <StarSharpIcon fontSize='large'
                                style={{
                                    color: expiredDateLeft > 0 ? '#ebf200' : 'inherit'
                                }} />
                        </IconButton>
                        <Tooltip title='Change avatar' placement='bottom' arrow>
                            <IconButton className={classes.attachIcon}>
                                <label htmlFor="upload-photo">
                                    <input
                                        style={{ display: "none" }}
                                        id="upload-photo"
                                        name="upload-photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={upfile}
                                    />
                                    <CameraAltIcon color='secondary' />
                                </label>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Save changes' placement='bottom' arrow>
                            <IconButton className={classes.saveIcon}>
                                <SaveRoundedIcon color='secondary' />
                            </IconButton>
                        </Tooltip>

                    </div>
                </div>

            </div>
            <div className={classes.accRightPanel}>
                <Typography variant='h6'>{`${account.profile.firstName} ${account.profile.lastName} `}</Typography>
                <Typography variant='subtitle1'>{`${account.profile.email} `}</Typography>
                <Button variant="contained" color='secondary' style={{ marginTop: '5px' }} onClick={() => history.push('/pricing')}>Buy Premium</Button>
                <span style={{ marginLeft: '15px', marginTop: '3px' }}>  {`${expiredDateLeft > 0 ? expiredDateLeft : 0} days left`}</span>

            </div>


            <br />
            <div style={{ marginTop: '250px' }}>
                <Divider />
                <div className={classes.detailInfo}>
                    <TextField label='First Name' variant='outlined' color='secondary'
                        value={firstName.value || ''}
                        className={classes.rootInput}
                        size="small"
                        onChange={e => onFirstNameChange(e.target.value)} />

                    <TextField label='Last Name' variant='outlined' color='secondary'
                        value={lastName.value || ''}
                        className={classes.rootInput}
                        size="small"
                        onChange={e => onLastNameChange(e.target.value)}
                    />

                    <TextField label='Email' variant='outlined' color='secondary'
                        value={email.value || ''}
                        size="small"
                        className={classes.rootInput}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: '30px' }}>

                </div>
            </div>

        </div>
    );
}

export default React.memo(AccPanel)
