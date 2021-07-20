import { CssBaseline, makeStyles } from '@material-ui/core';
import 'fontsource-roboto';
import React, { memo, ReactElement } from 'react';
import NavigationBar from './components/navigationBar/NavigationBar';
import ViewController from './components/viewController/ViewController';
import './core.css';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
    },
}));

function CalendarCore(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />

            <NavigationBar />
            <ViewController />
        </div>
    );
}

export default memo(CalendarCore);
