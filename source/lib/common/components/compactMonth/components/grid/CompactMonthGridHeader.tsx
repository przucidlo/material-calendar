import React, { ReactElement } from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import useLocale from '../../../../hooks/locale/useLocale';

export interface CompactMonthGridHeaderProps {
    /**
     * Month is used as unique key for every element of the grid.
     */
    month: Date;
}

const useStyles = makeStyles((theme) => ({
    headerItem: {
        width: 24,
        height: 24,
        textAlign: 'center',
        color: theme.palette.grey[600],
    },
}));

export default function CompactMonthGridHeader(props: CompactMonthGridHeaderProps): ReactElement {
    const classes = useStyles();
    const locale = useLocale();

    return (
        <Grid container spacing={1}>
            {locale.days.map((day) => (
                <Grid item key={['header-element', day, props.month.getMonth()].join('-')}>
                    <div className={classes.headerItem}>
                        <Typography variant="caption">{day.charAt(0).toLocaleUpperCase()}</Typography>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}
