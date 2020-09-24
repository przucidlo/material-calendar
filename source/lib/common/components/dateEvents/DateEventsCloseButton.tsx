import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

export interface DateEventsCloseButtonProps {
    onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.spacing(1),
    },
}));

export default function DateEventsCloseButton(props: DateEventsCloseButtonProps) {
    const classes = useStyles();

    return (
        <div className={classes.root} onClick={props.onClose}>
            <IconButton size="small">
                <CloseIcon />
            </IconButton>
        </div>
    );
}
