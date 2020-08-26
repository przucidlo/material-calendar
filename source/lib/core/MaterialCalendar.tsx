import { makeStyles } from '@material-ui/core';
import { addDays, addMonths, addWeeks } from 'date-fns';
import { isSameDay } from 'date-fns/esm';
import 'fontsource-roboto';
import React, { ReactElement, useEffect, useState } from 'react';
import { SelectInputValueType } from '../common/components/selectInput/SelectInput';
import CalendarViewController from './CalendarViewController';
import { DateChangeAction } from './components/actions/DateChangeAction';
import CalendarEvent from './components/eventStorage/CalendarEvent';
import CalendarEventStorage, { EventStorage } from './components/eventStorage/CalendarEventStorage';
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
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Roboto',
    },
}));

export default function MaterialCalendar(props: MaterialCalendarProps): ReactElement {
    // The date on which user has his view focused on.
    const [focusedDate, setFocusedDate] = useState(new Date(Date.now()));

    // Storage of events loaded into the calendar
    const [eventStorage, setEventStorage] = useState<EventStorage>({});

    // Currently displayed view
    const [selectedView, setSelectedView] = useState(null as null | ReactElement);

    // Value of SelectInput responsible for changing view option
    const [selectedViewOption, setSelectedViewOption] = useState<SelectInputValueType>('day');

    const classes = useStyles();

    const calendarEventStorage = new CalendarEventStorage(
        focusedDate,
        setEventStorage,
        props.onDataRequest,
        selectedViewOption.toString(),
    );

    useEffect(() => {
        calendarEventStorage.setFocusedDate(focusedDate);
    }, [focusedDate]);

    /**
     * Changes the currently focused date of the calendar based on provided DataChangeAction parameter.
     * @param dateChangeAction
     */
    function handleDateChange(dateChangeAction: DateChangeAction) {
        let changeAmountBy = 1;

        if (dateChangeAction === DateChangeAction.BACKWARD) {
            changeAmountBy = -1;
        }

        if (dateChangeAction === DateChangeAction.TODAY) {
            const todayDate = new Date(Date.now());

            // Prevent from setting same day once again,
            // which will trigger unnecessary re-render
            // of selected view
            if (!isSameDay(todayDate, focusedDate)) {
                setFocusedDate(todayDate);
            }

            return;
        }

        switch (selectedViewOption) {
            case 'day':
                setFocusedDate(addDays(focusedDate, changeAmountBy));
                break;
            case 'week':
                setFocusedDate(addWeeks(focusedDate, changeAmountBy));
                break;
            case 'month':
                setFocusedDate(addMonths(focusedDate, changeAmountBy));
                break;
            case 'schedule':
                setFocusedDate(addMonths(focusedDate, changeAmountBy));
                break;
        }
    }

    return (
        <div className={classes.root}>
            <CalendarControlBar
                date={focusedDate}
                onDateChange={handleDateChange}
                onInputChange={setSelectedViewOption}
            />
            <CalendarViewController
                focusedDate={focusedDate}
                selectedView={selectedView}
                selectedViewOption={selectedViewOption}
                setSelectedView={setSelectedView}
                onDateChange={handleDateChange}
                eventStorage={eventStorage}
            />
        </div>
    );
}
