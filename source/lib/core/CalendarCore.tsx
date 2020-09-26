import { makeStyles } from '@material-ui/core';
import 'fontsource-roboto';
import React, { ReactElement } from 'react';
import NavigationBar from './components/navigationBar/NavigationBar';
import ViewController from './components/viewController/ViewController';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
    },
}));

export default function CalendarCore(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavigationBar />
            <ViewController />
        </div>
    );
}
