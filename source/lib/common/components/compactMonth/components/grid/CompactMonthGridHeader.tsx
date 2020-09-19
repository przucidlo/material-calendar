import React, { ReactElement, ReactNode } from 'react';
import { makeStyles, Avatar, Typography, Grid } from '@material-ui/core';
import useLocale from '../../../../hooks/locale/useLocale';

const useStyles = makeStyles((theme) => ({
    headerItem: {
        width: 24,
        height: 24,
        textAlign: 'center',
        color: theme.palette.grey[600],
    },
}));

export default function CompactMonthGridHeader(): ReactElement {
    const classes = useStyles();
    const locale = useLocale();

    return (
        <Grid container spacing={1}>
            {locale.days.map((day) => (
                <Grid item>
                    <div className={classes.headerItem}>
                        <Typography variant="caption">{day.charAt(0).toLocaleUpperCase()}</Typography>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}
