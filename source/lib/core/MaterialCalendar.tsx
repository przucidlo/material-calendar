import { makeStyles } from '@material-ui/core';
import 'fontsource-roboto';
import React, { ReactElement } from 'react';
import CalendarEvent from '../common/api/CalendarEvent';
import CalendarEventStorage from '../common/api/CalendarEventStorage';
import NavigationBar from './components/navigationBar/NavigationBar';
import ViewController from './components/viewController/ViewController';

interface MaterialCalendarProps {
    /**
     * Function requesting data from specific range of time, which will be displayed in calendar.
     * (There is no need to sort the data before passing it to the calendar.)
     */
    onDataRequest: (from: Date, till: Date) => Promise<CalendarEvent[]>;

    /**
     * Returns instance of CalendarEventStorage
     *
     * TODO: Write explanation why this useful.
     *
     * NOT IMPLEMENTED YET
     */
    getCalendarEventStorage?: (calendarEventStorage: CalendarEventStorage) => void;

    /**
     * If set to true calendar will only request data when It's needed,
     * minimizing data requests and store requested data in memory.
     *
     * Otherwise calendar will load data each time the view is changed.
     * @default true
     */
    lazyLoading: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
    },
}));

export default function MaterialCalendar(props: MaterialCalendarProps): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavigationBar />
            <ViewController />
        </div>
    );
}
