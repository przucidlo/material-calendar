import React, { ReactNode } from 'react';
import { CalendarContext, CalendarContextStructure } from '../../../common/contexts/CalendarContext';
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
            <ViewContext.Provider value={props.viewContext}>{props.children}</ViewContext.Provider>
        </CalendarContext.Provider>
    );
}
