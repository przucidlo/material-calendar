import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { EventStorage } from '../../api/EventStorage';
import DateEventsCloseButton from './DateEventsCloseButton';
import DateEventsContent from './DateEventsContent';
import DateEventsLabel from './DateEventsLabel';

export interface DateEventsProps {
    date: Date;
    eventStorage: EventStorage;

    onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {},
}));

export default function DateEvents(props: DateEventsProps): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DateEventsCloseButton onClose={props.onClose} />
            <DateEventsLabel date={props.date} />
            <DateEventsContent eventStorage={props.eventStorage} date={props.date} />
        </div>
    );
}
