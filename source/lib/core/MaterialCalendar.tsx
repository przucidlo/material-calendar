import { makeStyles } from '@material-ui/core';
import { isSameDay } from 'date-fns/esm';
import 'fontsource-roboto';
import React, { ReactElement, useEffect, useState } from 'react';
import CalendarEvent from '../common/api/CalendarEvent';
import { CalendarView } from '../common/api/CalendarView';
import { SelectInputValueType } from '../common/components/selectInput/SelectInput';
import CalendarViewController from './CalendarViewController';
import { DateChangeAction } from './components/actions/DateChangeAction';
import CalendarState from './components/calendarState/CalendarState';
import useCalendarState from './components/calendarState/useCalendarState';
import CalendarEventStorage from './components/eventStorage/CalendarEventStorage';
import CalendarControlBar from './components/navigationBar/CalendarControlBar';

interface MaterialCalendarProps {
    /**
     * Function requesting data from specific range of time, which will be displayed in calendar.
     * (There is no need to sort the data before passing it to the calendar.)
     */
    onDataRequest: (from: Date, till: Date) => Promise<CalendarEvent[]>;

    /**
     * If set to true calendar will only request data when It's needed,
     * minimizing data requests and store requested data in memory.
     *
     * Otherwise calendar will load data each time the view is changed.
     * @default true
     */
    lazyLoading: boolean;

    /**
     * List of views that will be used by the calendar.
     * If none are provided, It will use the default views.
     */
    views?: CalendarView[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
    },
}));

export default function MaterialCalendar(props: MaterialCalendarProps): ReactElement {
    const calendarState: CalendarState = useCalendarState();

    // Value of SelectInput responsible for changing view option
    const [selectedViewOption, setSelectedViewOption] = useState<SelectInputValueType>('day');

    const classes = useStyles();

    const calendarEventStorage = new CalendarEventStorage(
        calendarState.getHighlightDate(),
        calendarState.setEventStorage,
        props.onDataRequest,
        selectedViewOption.toString(),
    );

    useEffect(() => {
        calendarEventStorage.setFocusedDate(calendarState.getHighlightDate());
    }, [calendarState.getHighlightDate()]);

    useEffect(() => {
        if (props.views) {
            calendarState.setCurrentView(props.views[0]);
        }
    });

    /**
     * Changes the currently focused date of the calendar based on provided DataChangeAction parameter.
     * @param dateChangeAction
     */
    function handleDateChange(dateChangeAction: DateChangeAction) {
        if (dateChangeAction === DateChangeAction.TODAY) {
            // Prevent from setting same day once again, which will trigger unnecessary re-render.
            if (!isSameDay(Date.now(), calendarState.getHighlightDate())) {
                calendarState.setHighlightDate(new Date());
            }

            return;
        }
        const currentView = calendarState.getCurrentView();

        if (currentView && currentView.onDateChange) {
            calendarState.setHighlightDate(
                currentView.onDateChange(dateChangeAction, calendarState.getHighlightDate()),
            );
        }
    }

    return (
        <div className={classes.root}>
            <CalendarControlBar
                date={calendarState.getHighlightDate()}
                onDateChange={handleDateChange}
                onInputChange={setSelectedViewOption}
            />
            <CalendarViewController calendarState={calendarState} />
        </div>
    );
}
