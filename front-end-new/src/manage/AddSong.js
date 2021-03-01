import React, { memo, useState, useEffect, useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import FormData from 'form-data'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import PublishIcon from '@material-ui/icons/Publish'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '3px'
    },
    item: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    image: {
        maxWidth: '100%',
        marginLeft: '15px',
        marginTop: '15px',
        borderRadius: '10px'
    },
    coverdivimg: {
        display: 'inline-block',
        position: 'relative',
        width: '300px',
        overflow: 'hidden',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
    },
}))
const AddSong = ({ albums = [], uploadSong, setSnack }) => {
    const classes = useStyles()
    const [song, setSong] = useState({
        title: '',
        source: '',
        premium: false,
        label: '',
        releasedDate: moment().format('YYYY-MM-DD').toString(),
        album_id: ''
    })

    const [album, setAlbum] = useState({
        title: '',
        album_id: ''
    })

    const albumsOps = useMemo(() => {
        return albums.map(al => { return { title: al.title, album_id: al.album_id } })
    }, [albums])
    const albumsProps = {
        options: albumsOps,
        getOptionLabel: (option) => option.title,
    }
    const labelProps = {
        options: ['joy', 'sadness'],
        getOptionLabel: (option) => option,
    }
    const upfile = (e) => {
        if (e.target.files, e.target.files[0]) {
            const acc_img = document.getElementById("acc_img")
            acc_img.src = URL.createObjectURL(e.target.files[0])
            setSong({
                ...song,
                cover: e.target.files[0]
            })
        }
    }
    const upMp3 = (e) => {
        if (e.target.files && e.target.files[0]) {
            const mp3 = document.getElementById("mp3")
            mp3.src = URL.createObjectURL(e.target.files[0])
            document.getElementById('mp3fileName').innerHTML = e.target.files[0].name
            setSong({
                ...song,
                source: e.target.files[0]
            })
        }
    }

    const submitSong = () => {
        const formData = new FormData()
        formData.append('title', song.title)
        formData.append('source', song.source)
        formData.append('premium', song.premium)
        formData.append('label', song.label)
        formData.append('releasedDate', song.releasedDate)
        formData.append('cover', song.cover)
        formData.append('album_id', song.album_id)
        formData.append('duration', Math.floor(document.getElementById("mp3").duration))
        uploadSong(formData).then(res => setSnack({
            message: res.message,
            status: res.status,
            open: true
        }))
    }
    return (

        <Paper className={classes.root} >
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={4}>
                        <div className={classes.coverdivimg}>
                            <img id='acc_img' className={classes.image} alt='Song cover' />
                        </div>
                        <Button color='secondary'>
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={upfile}
                                />
                                <CameraAltIcon />
                            </label>
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container item xs={11} spacing={1}>
                            <Grid item xs={5} className={classes.item}>
                                <TextField color='secondary'
                                    value={song.title}
                                    onChange={(e) => setSong({
                                        ...song,
                                        title: e.target.value
                                    })}
                                    label='Title'
                                // size="small"
                                />
                            </Grid>
                            <Grid item xs={5} className={classes.item}>
                                <Autocomplete
                                    {...albumsProps}
                                    id="clear-on-escape"
                                    clearOnEscape
                                    renderInput={(params) => <TextField {...params} label="Album" size="small" color="secondary" />}
                                    onChange={(event, newValue) => {
                                        setSong({
                                            ...song,
                                            album_id: newValue.album_id
                                        })
                                        // setAlbum(newValue)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={11} spacing={1}>
                            <Grid item xs={5} className={classes.item}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={song.premium}
                                            color='secondary'
                                            onChange={() => setSong({ ...song, premium: !song.premium })}
                                            name="premium" />}
                                    label="Premium"
                                />
                            </Grid>
                            <Grid item xs={5} className={classes.item}>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Released Date"
                                        type="date"
                                        defaultValue={moment().format('YYYY-MM-DD').toString()}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.textField}
                                        color='secondary'
                                        onChange={(e) => setSong({
                                            ...song,
                                            releasedDate: e.target.value
                                        })}
                                    />
                                </form>
                            </Grid>
                        </Grid>
                        <Grid container item xs={11} spacing={1}>
                            <Grid item xs={5} className={classes.item}>
                                {/* <Button variant="contained" color="secondary" size="small"> */}
                                <label htmlFor="upload-mp3">
                                    <input
                                        style={{ display: "none" }}
                                        type="file" name="upload-mp3" id="upload-mp3"
                                        accept=".mp3" onChange={upMp3} />

                                    <div id='mp3fileName'>
                                        MP3
                                        </div>
                                </label>

                                {/* </Button> */}
                                <audio id='mp3' controls>
                                    <source src="horse.mp3" type="audio/mpeg" id='audioSrc' />
                                </audio>

                            </Grid>
                            <Grid item xs={5} className={classes.item}>
                                <Autocomplete
                                    {...labelProps}
                                    clearOnEscape
                                    renderInput={(params) => <TextField {...params} label="Label" size="small" color="secondary" />}
                                    onChange={(event, newValue) => {
                                        setSong({
                                            ...song,
                                            label: newValue
                                        })

                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={5}>
                        <Button
                            startIcon={<PublishIcon />}
                            color='secondary' variant='contained'
                            style={{ marginLeft: '15px', marginTop: '15px' }}
                            onClick={() => submitSong()}
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >


    )
}

export default memo(AddSong)

