import { Grid, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import NavigationBarControls from './NavigationBarControls';
import NavigationBarViewSelect from './NavigationBarViewSelect';

const useStyles = makeStyles((theme) => ({
    navigationBar: {
        height: 63,
        width: '100%',
        background: theme.palette.common.white,
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
    },
    gridStyle: {
        height: 63,
        top: 0,
        position: 'sticky',
    },
}));

export default function NavigationBar(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.navigationBar}>
            <Grid container direction="row" alignItems="center" justify="space-around" className={classes.gridStyle}>
                <NavigationBarControls />

                <NavigationBarViewSelect />
            </Grid>
        </div>
    );
}
