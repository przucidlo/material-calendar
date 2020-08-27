import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import CalendarEvent from '../../../common/api/CalendarEvent';
import ScheduleViewEvent from '../event/ScheduleViewEvent';

export interface ScheduleGridElementProps {
    date: Date;
    day: number | string;

    calendarEvents: CalendarEvent[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],

        display: 'flex',
    },
    monthAndDay: {
        paddingLeft: theme.spacing(1),
    },
}));

export default function ScheduleGridElement(props: ScheduleGridElementProps) {
    const classes = useStyles();
    let date = props.date;

    // Date provided by ScheduleGrid will have the incorrect day set,
    // So we fix it here.
    date.setDate((props.day as unknown) as number);

    function displayEventsElements(): ReactNode[] {
        return props.calendarEvents.map((calendarEvent) => (
            <ScheduleViewEvent event={calendarEvent} key={calendarEvent.id} />
        ));
    }

    return (
        <div className={classes.root}>
            <Box width={120}>
                <Typography variant="h6" display="inline">
                    {props.day}
                </Typography>
                <Typography variant="caption" display="inline" className={classes.monthAndDay}>
                    {monthsNameShort[date.getMonth()].toLocaleUpperCase()},{' '}
                    {daysNamesShort[date.getDay()].toLocaleUpperCase()}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" width="100%" justifyContent="center">
                {displayEventsElements()}
            </Box>
        </div>
    );
}
