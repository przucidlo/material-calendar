import { makeStyles, Typography } from '@material-ui/core';
import { isPast, isThisMonth } from 'date-fns';
import React, { ReactElement } from 'react';
import useLocale from '../../../../hooks/locale/useLocale';

export interface CompactMonthLabel {
    month: Date;
}

const useStyles = makeStyles((theme) => ({
    monthLabel: {
        fontSize: '14px',
        letterSpacing: '0.90px',
        fontWeight: 'bold',
        paddingLeft: 4,
    },
    monthLabelPast: {
        color: theme.palette.grey[600],
    },
    monthLabelFuture: {
        color: theme.palette.grey[900],
    },
}));

export default function CompactMonthLabel(props: CompactMonthLabel): ReactElement {
    const classes = useStyles();
    const locale = useLocale();

    const monthLabelClasses: string = [classes.monthLabel, getMonthLabelColor()].join(' ');

    function getMonthLabelColor(): string {
        return isPast(props.month) && !isThisMonth(props.month) ? classes.monthLabelPast : classes.monthLabelFuture;
    }

    return (
        <Typography variant="body1" className={monthLabelClasses} gutterBottom>
            {locale.months[props.month.getMonth()]}
        </Typography>
    );
}
