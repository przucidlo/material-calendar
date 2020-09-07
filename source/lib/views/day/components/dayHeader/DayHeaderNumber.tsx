import { Avatar, makeStyles } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';

export interface DayHeaderNumberProps {
    highlightDate: Date;

    openDayViewOnClick?: boolean;
}

const useStyles = makeStyles((theme) => ({
    dayNumberCommon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        color: theme.palette.text.primary,
    },
    dayNumberPlain: {
        backgroundColor: 'inherit',

        '&:hover': {
            backgroundColor: (props: any) => (props.openDayView ? theme.palette.grey[200] : 'inherit'),
        },
    },
    dayNumberToday: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),

        '&:hover': {
            backgroundColor: (props: any) =>
                props.openDayView ? theme.palette.primary.dark : theme.palette.primary.main,
        },
    },
}));

export default function DayHeaderNumber(props: DayHeaderNumberProps): ReactElement {
    const classes = useStyles({ openDayView: props.openDayViewOnClick });

    function getDayNumberBackground(): string {
        return isToday(props.highlightDate) ? classes.dayNumberToday : classes.dayNumberPlain;
    }

    function changeViewToDayView(): void {
        if (props.openDayViewOnClick) {
        }
    }

    return (
        <Avatar className={[classes.dayNumberCommon, getDayNumberBackground()].join(' ')}>
            {props.highlightDate.getDate()}
        </Avatar>
    );
}
