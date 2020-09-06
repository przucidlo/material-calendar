import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';
import useLocale from '../../../../common/hooks/locale/useLocale';

export interface DayHeaderContentProps {
    highlightDate: Date;
}

const useStyle = makeStyles((theme) => ({
    root: {
        width: 96,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dayNumber: {
        backgroundColor: theme.palette.grey[500],
    },
    dayNumberToday: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function DayHeaderContent(props: DayHeaderContentProps): ReactElement {
    const classes = useStyle();
    const locale = useLocale();

    function getDayLabel(): ReactElement {
        return (
            <Typography color="primary" variant="body1">
                {locale.daysShort[props.highlightDate.getDay()].toLocaleUpperCase()}
            </Typography>
        );
    }

    function getDayNumber(): ReactElement {
        return (
            <Avatar className={isToday(props.highlightDate) ? classes.dayNumberToday : classes.dayNumber}>
                {props.highlightDate.getDate()}
            </Avatar>
        );
    }

    return (
        <div className={classes.root}>
            {getDayLabel()}
            {getDayNumber()}
        </div>
    );
}
