import React, { useState, useRef } from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import HoverMenus from './HoverMenus'
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
    },
    popover: {
        pointerEvents: "none",
        cursor:'pointer',
        marginTop: '0.5%'
    },
    popoverContent: {
        pointerEvents: "auto"
    }
}));

const PopoverMenus = ({ lists, title }) => {
    const [openedPopover, setOpenedPopover] = useState(false);
    const popoverAnchor = useRef(null);

    const classes = useStyles();

    const popoverEnter = () => {
        setOpenedPopover(true);
    };

    const popoverLeave = () => {
        setOpenedPopover(false);
    };


    return (
        <div >
            <div
                ref={popoverAnchor}
                aria-owns="mouse-over-popover"
                aria-haspopup="true"
                onMouseEnter={popoverEnter}
                onMouseLeave={popoverLeave}
            >
                {title}
            </div>
            <Popover

                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.popoverContent
                }}
                open={openedPopover}
                anchorEl={popoverAnchor.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}

                PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
            >
                <HoverMenus lists={lists} />
            </Popover>
        </div>
    );
}

export default React.memo(PopoverMenus);
