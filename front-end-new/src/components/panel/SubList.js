/* eslint-disable no-use-before-define */
import React, { useContext, useMemo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { addPlaylist, addSongToPlaylist } from '../../actions/account'
import { ACTION, ACTION_PREFIX } from '../../mylib/constant/constStr'
import { isObject } from 'lodash'
import AppContext from '../../context/app-context'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { statusSeverity } from '../../mylib/supports/functions'

const filter = createFilterOptions();

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const SubList = ({ song, mainOpen, mainOnClose }) => {

  const { account, dispatchAccount, dispatchSnack } = useContext(AppContext)
  const [value, setValue] = React.useState(null)
  const [open, toggleOpen] = React.useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  var ops = useMemo(() => {
    return account.userPlaylists.map(pl => {
      return {
        title: pl.title,
        playlist_id: pl.playlist_id
      }
    })
  }, [account])

  const handleClose = () => {
    setDialogValue({
      title: '',
      playlist_id: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    playlist_id: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      playlist_id: dialogValue.playlist_id,
    })
    handleClose()
  }

  const onCreatePl = () => {
    if (isObject(dialogValue) && dialogValue != null) {
      addPlaylist(dialogValue.title).then(res => {
        dispatchSnack(
          {
            type: ACTION.SET_SNACK,
            data: { message: res.message, status: res.status }
          })
        dispatchAccount({ type: ACTION_PREFIX.ADD_ + ACTION.USER_PLAYLISTS, data: res.playlist })
        setValue({ title: dialogValue.title, playlist_id: res.playlist.playlist_id })
      })
      toggleOpen(false)
    }
  }


  const onAddSongToPl = () => {

    if (value != null) {
      addSongToPlaylist(song.song_id, value.playlist_id).then(res => {
        dispatchSnack(
          {
            type: ACTION.SET_SNACK,
            data: { message: res.message, status: res.status }
          })
      })

    }
    mainOnClose()
  }

  return (
    <>

      <Dialog open={mainOpen} onClose={() => mainOnClose()} fullScreen={fullScreen} >
        <DialogTitle >{"Select your playlist"}</DialogTitle>
        <DialogContent>
          <React.Fragment>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue({
                      title: newValue,
                      playlist_id: '',
                    })
                  })
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true)
                  setDialogValue({
                    title: newValue.inputValue,
                    playlist_id: '',
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={ops}
              getOptionLabel={(option) => {
                // e.g value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                return option.inputValue ? option.inputValue : option.title
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(option) => option.title}
              style={{ width: 300, padding: '5px' }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Select your playlist" color='secondary' variant="outlined" />
              )}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Create a new playlist</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Did you miss any playlist in our list? Please, add it!
            </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={dialogValue.title}
                    onChange={(event) => setDialogValue({ ...dialogValue, title: event.target.value })}
                    label="title"
                    type="text"
                    color='secondary'
                  />
                </DialogContent>
                <DialogActions>
                  <Button type="submit" color='secondary' variant="contained" onClick={onCreatePl}>
                    Add
                </Button>
                  <Button onClick={handleClose} color='secondary' variant="contained">
                    Cancel
                </Button>

                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => onAddSongToPl()} color="secondary" variant="contained">
            Add
        </Button>
          <Button onClick={() => mainOnClose()} color="secondary" variant="contained" autoFocus>
            Cancel
        </Button>
        </DialogActions>

      </Dialog>

    </>
  )
}


export default React.memo(SubList)