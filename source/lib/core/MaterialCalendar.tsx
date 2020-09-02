import { makeStyles } from '@material-ui/core';
import { isSameDay } from 'date-fns/esm';
import 'fontsource-roboto';
import React, { ReactElement, useEffect, useState } from 'react';
import CalendarEvent from '../common/api/CalendarEvent';
import { CalendarView } from '../common/api/CalendarView';
import { DateChangeAction } from '../common/api/DateChangeAction';
import { SelectInputValue } from '../common/components/selectInput/SelectInput';
import { CalendarContext } from '../common/contexts/CalendarContext';
import { ViewContext } from '../common/contexts/ViewContext';
import useCalendarContext from '../common/hooks/context/useCalendarContext';
import useViewContext from '../common/hooks/context/useViewContext';
import CalendarEventStorage from './components/eventStorage/CalendarEventStorage';
import NavigationBar from './components/navigationBar/NavigationBar';
import ViewController from './components/viewController/ViewController';

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
     * If none are provided, It will use the default ones.
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
    const calendarContext = useCalendarContext();
    const viewContext = useViewContext();

    const [selectedViewOption, setSelectedViewOption] = useState<SelectInputValue>('day');

    const classes = useStyles();

    const calendarEventStorage = new CalendarEventStorage(
        viewContext.highlightDate,
        calendarContext.setEventStorage,
        props.onDataRequest,
        selectedViewOption.toString(),
    );

    useEffect(() => {
        calendarEventStorage.setFocusedDate(viewContext.highlightDate);
    }, [viewContext.highlightDate]);

    useEffect(() => {
        if (props.views) {
            calendarContext.setViews(props.views);

            viewContext.setView(props.views[0]);
        }
    }, []);

    /**
     * Changes the currently focused date of the calendar based on provided DataChangeAction parameter.
     * @param dateChangeAction
     */
    function handleDateChange(dateChangeAction: DateChangeAction) {
        if (dateChangeAction === DateChangeAction.TODAY) {
            // Prevent from setting same day once again, which will trigger unnecessary re-render.
            if (!isSameDay(Date.now(), viewContext.highlightDate)) {
                viewContext.setHighlightDate(new Date());
            }

            return;
        }
        const view = viewContext.view;

        if (view && view.onDateChange) {
            viewContext.setHighlightDate(view.onDateChange(dateChangeAction, viewContext.highlightDate));
        }
    }

    return (
        <CalendarContext.Provider value={calendarContext}>
            <ViewContext.Provider value={viewContext}>
                <div className={classes.root}>
                    <NavigationBar onDateChangeAction={handleDateChange} />
                    <ViewController />
                </div>
            </ViewContext.Provider>
        </CalendarContext.Provider>
    );
}
