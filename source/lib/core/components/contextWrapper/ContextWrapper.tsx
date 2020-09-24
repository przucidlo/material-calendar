import React, { ReactNode } from 'react';
import { CalendarContext, CalendarContextStructure } from '../../../common/contexts/CalendarContext';
import { EventStorageContext, EventStorageContextStructure } from '../../../common/contexts/EventStorageContext';
import ViewContextStructure, { ViewContext } from '../../../common/contexts/ViewContext';

export interface ContextWrapperProps {
    /**
     * Instance of CalendarContextStructure interface.
     *
     * @see useCalendarContext hook for default implementation.
     */
    calendarContext: CalendarContextStructure;

    /**
     * Instance of ViewContextStructure interface.
     *
     * @see useViewContext hook for default implementation.
     */
    viewContext: ViewContextStructure;

    /**
     * Instance of EventStorageContextStructure interface.
     *
     * @see useEventStorageContext hook for default implementation.
     */
    eventStorage: EventStorageContextStructure;

    children: ReactNode;
}

/**
 * Wraps context providers used by calendar to one
 * component and requires their values in props.
 *
 * @internal
 */
export default function ContextWrapper(props: ContextWrapperProps) {
    return (
        <CalendarContext.Provider value={props.calendarContext}>
            <ViewContext.Provider value={props.viewContext}>
                <EventStorageContext.Provider value={props.eventStorage}>{props.children}</EventStorageContext.Provider>
            </ViewContext.Provider>
        </CalendarContext.Provider>
    );
}
