import { makeStyles } from '@material-ui/core';
import 'fontsource-roboto';
import React, { memo, ReactElement } from 'react';
import NavigationBar from './components/navigationBar/NavigationBar';
import ViewController from './components/viewController/ViewController';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
        boxSizing: 'content-box!important' as any,

        '*, *::before, *::after': {
            boxSizing: 'content-box!important' as any,
        }
    },
}));

function CalendarCore(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavigationBar />
            <ViewController />
        </div>
    );
}

export default memo(CalendarCore);
