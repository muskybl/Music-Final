import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
const DialogPanel = ({ title, content, yesText, noText, isOpen, onYesClick, onCloseClick }) => {
    
    return (

        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={onCloseClick}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={onYesClick}>
                    {yesText}
                </Button>
                <Button variant="contained" color="secondary" autoFocus onClick={onCloseClick}>
                    {noText}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default React.memo(DialogPanel)
