import { CssBaseline, makeStyles } from '@material-ui/core';
import 'fontsource-roboto';
import React, { memo, ReactElement } from 'react';
import NavigationBar from './components/navigationBar/NavigationBar';
import ViewController from './components/viewController/ViewController';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
    },
    '@global': {
        '*::-webkit-scrollbar': {
            WebkitAppearance: 'none',
        },
        '*::-webkit-scrollbar:vertical': {
            width: '16px',
        },
        '*::-webkit-scrollbar:horizontal': {
            height: '16px',
        },
        '*::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: 'rgb(190, 193, 198)',
            border: '4px solid white',
        },
        '*::webkit-scrollbar-track': {
            backgroundColor: '#fff',
            borderRadius: '8px',
        },
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
