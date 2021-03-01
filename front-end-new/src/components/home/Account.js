import React, { useContext } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AppContext from '../../context/app-context'
import Divider from '@material-ui/core/Divider'
import StyleLink from '../row/StyleLink'
import cookies from 'js-cookie'
import { ACTION } from '../../mylib/constant/constStr'
import Badge from '@material-ui/core/Badge'
import StarSharpIcon from '@material-ui/icons/StarSharp'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ContactsIcon from '@material-ui/icons/Contacts'
import ROUTE from '../../mylib/constant/route'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function Account() {
    const { account, dispatchAccount } = useContext(AppContext)
    const token = cookies.get('token')
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleLogout = (event) => {
        cookies.remove('token', { path: '/' })
        dispatchAccount({ type: ACTION.SIGN_OUT })
        handleClose(event)
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>

                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<StarSharpIcon fontSize='small' style={{ color: account.profile.premium ? '#ebf200' : 'inherit' }} />}
                >
                    <Avatar
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        src={token !== undefined ? account.profile.avatar : '/images/account.png'}
                    />
                </Badge>



                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper style={{ minWidth: '150px' }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                                        <StyleLink to={ROUTE.PRICING}>
                                            <MenuItem onClick={handleClose} style={{ justifyContent: 'flex-start' }}>
                                                <ListItemIcon>
                                                    <StarSharpIcon style={{ color: '#ebf200' }} />
                                                </ListItemIcon>
                                                <Typography>Premium</Typography>
                                            </MenuItem>
                                        </StyleLink>
                                        <Divider />
                                        {
                                            token === undefined ?
                                                <div >
                                                    <StyleLink to={ROUTE.SIGN_IN}>
                                                        <MenuItem onClick={handleClose} style={{ justifyContent: 'flex-start' }}>
                                                            <ListItemIcon>
                                                                <VpnKeyIcon color="secondary" />
                                                            </ListItemIcon>
                                                            <Typography>Login</Typography>
                                                        </MenuItem>
                                                    </StyleLink>
                                                    <Divider />
                                                    <StyleLink to={ROUTE.SIGN_UP}>
                                                        <MenuItem onClick={handleClose} style={{ justifyContent: 'flex-start' }}>
                                                            <ListItemIcon>
                                                                <PersonAddIcon color="secondary" />
                                                            </ListItemIcon>
                                                            <Typography>Register</Typography>
                                                        </MenuItem>
                                                    </StyleLink>
                                                </div>
                                                :
                                                <div>

                                                    <StyleLink to={ROUTE.HOME}>
                                                        <MenuItem onClick={handleLogout} style={{ justifyContent: 'flex-start' }}>
                                                            <ListItemIcon>
                                                                <ExitToAppIcon color="secondary" />
                                                            </ListItemIcon>
                                                            <Typography>Logout</Typography>
                                                        </MenuItem>
                                                    </StyleLink>
                                                    <Divider />
                                                    <StyleLink to={ROUTE.PROFILE}>
                                                        <MenuItem onClick={handleClose} style={{ justifyContent: 'flex-start' }}>
                                                            <ListItemIcon>
                                                                <ContactsIcon color="secondary" />
                                                            </ListItemIcon>
                                                            <Typography>Profile</Typography>
                                                        </MenuItem>
                                                    </StyleLink>
                                                </div>
                                        }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}