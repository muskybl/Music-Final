import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenusRow from '../row/MenusRow'
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        paddingTop: '3%',
        paddingBottom: '3%',        
    },    
}));

const HoverMenus = ({ lists }) => {
    const classes = useStyles();
    const numberLines = Math.ceil(lists.length / 3)


    const Menu = () => {
        var rows = []

        for (let row = 1; row <= numberLines; row++) {
            const start = (row - 1) * 3
            const end = (row * 3 - lists.length) <= 0 ? start + 3 : lists.length - start
            rows.push((
                <Grid container item xs={12} spacing={1} key={`menu-rows:${row}`}>
                    <MenusRow items={lists.slice(start, end)} />
                </Grid>))
        }
        return rows
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Menu />
            </Grid>
        </div>
    );
}

export default React.memo(HoverMenus);
