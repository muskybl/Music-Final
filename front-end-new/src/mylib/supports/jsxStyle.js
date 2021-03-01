import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import { statusSeverity } from '../supports/functions'
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export const progressBar = {
    position: 'absolute',
    marginLeft: '-30%',
    width: '180%',
    height: '2px'
}

export const Snack = ({ mess, status, isOpenSnack, onSnackClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={2500}
            TransitionComponent={SlideTransition}
            open={isOpenSnack}
            severity={statusSeverity(status)}
            onClose={() => onSnackClose()}
        >
            <MuiAlert elevation={6} variant="filled" severity={statusSeverity(status)}>
                {mess}
            </MuiAlert>
        </Snackbar>
    )
}
