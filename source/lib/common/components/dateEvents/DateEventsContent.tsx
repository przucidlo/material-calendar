import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../api/CalendarEvent';
import { EventStorage } from '../../api/EventStorage';
import CalendarEventUtils from '../../tools/CalendarEventUtils';

export interface DateEventsContent {
    eventStorage: EventStorage;
    date: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
    },
}));

export default function DateEventsContent(props: DateEventsContent): ReactElement {
    const events: CalendarEvent[] = CalendarEventUtils.getDayEvents(props.eventStorage, props.date);
    const classes = useStyles();

    function getContent(): ReactElement {
        console.log(events);

        if (events) {
        }
        return <LinearProgress />;
    }

    return <div className={classes.root}>{getContent()}</div>;
}
