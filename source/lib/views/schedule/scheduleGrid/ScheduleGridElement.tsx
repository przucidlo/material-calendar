import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import CalendarEvent from '../../../common/api/CalendarEvent';
import EventPopoverContent from '../../../common/api/EventPopoverContent';
import useLocale from '../../../common/hooks/locale/useLocale';
import ScheduleViewEvent from '../event/ScheduleViewEvent';

export interface ScheduleGridElementProps {
    date: Date;
    day: number | string;

    calendarEvents: CalendarEvent[];
    popover?: EventPopoverContent;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],

        display: 'flex',
    },
    monthAndDay: {
        paddingLeft: theme.spacing(1),
    },
}));

export default function ScheduleGridElement(props: ScheduleGridElementProps) {
    const locale = useLocale();
    const classes = useStyles();
    let date = props.date;

    // Date provided by ScheduleGrid will have the incorrect day set,
    // So we fix it here.
    date.setDate(props.day as unknown as number);

    function displayEventsElements(): ReactNode[] {
        return props.calendarEvents.map((calendarEvent) => (
            <ScheduleViewEvent event={calendarEvent} key={calendarEvent.id} popover={props.popover} />
        ));
    }

    return (
        <div className={classes.root}>
            <Box width={120}>
                <Typography variant="h6" display="inline">
                    {props.day}
                </Typography>
                <Typography variant="caption" display="inline" className={classes.monthAndDay}>
                    {locale.monthsShort[date.getMonth()].toLocaleUpperCase()},{' '}
                    {locale.daysShort[date.getDay()].toLocaleUpperCase()}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" width="100%" justifyContent="center">
                {displayEventsElements()}
            </Box>
        </div>
    );
}
