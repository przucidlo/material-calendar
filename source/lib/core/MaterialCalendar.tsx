import React from 'react';
import CalendarEvent from '../common/api/CalendarEvent';
import CalendarEventStorage from '../common/api/CalendarEventStorage';
import { CalendarView } from '../common/api/CalendarView';
import { CalendarContext } from '../common/contexts/CalendarContext';
import { EventStorageContext } from '../common/contexts/EventStorageContext';
import { ViewContext } from '../common/contexts/ViewContext';
import CalendarContextStore from '../common/hooks/context/CalendarContextStore';
import EventStorageContextStore from '../common/hooks/context/EventStorageContextStore';
import { ViewContextStore } from '../common/hooks/context/ViewContextStore';
import CalendarCore from './CalendarCore';
import useCalendarEventStorage from './components/eventStorage/useCalendarEventStorage';

export interface MaterialCalendarProps {
    /**
     * List of views that will be used by the calendar.
     * If none are provided, It will use the default ones.
     */
    views?: CalendarView[];

    /**
     * If set to true calendar will only request data when It's needed,
     * minimizing data requests and store requested data in memory.
     *
     * Otherwise calendar will load data each time the view is changed.
     * @default true
     */
    lazyLoading: boolean;

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
}

/**
 */
export default function MaterialCalendar(props: MaterialCalendarProps) {
    const calendarContextStore = CalendarContextStore(props.views ? props.views : []);
    const eventStorageContextStore = EventStorageContextStore();
    const viewContextStore = ViewContextStore(getDefaultView());

    const calendarEventStorage = useCalendarEventStorage({
        onDataRequest: props.onDataRequest,
        viewContext: viewContextStore,
        eventStorageContext: eventStorageContextStore,
    });

    function getDefaultView(): CalendarView | null {
        if (props.views && props.views.length > 0) {
            return props.views[0];
        }
        return null;
    }

    return (
        <CalendarContext.Provider value={calendarContextStore}>
            <ViewContext.Provider value={viewContextStore}>
                <EventStorageContext.Provider value={eventStorageContextStore}>
                    <CalendarCore />
                </EventStorageContext.Provider>
            </ViewContext.Provider>
        </CalendarContext.Provider>
    );
}
