import React, { ReactNode } from 'react';
import { CalendarContext, CalendarContextStructure } from '../../../common/contexts/CalendarContext';
import ViewContextStructure, { ViewContext } from '../../../common/contexts/ViewContext';

export interface ContextWrapperProps {
    calendarContext: CalendarContextStructure;
    viewContext: ViewContextStructure;

    children: ReactNode;
}

export default function ContextWrapper(props: ContextWrapperProps) {
    return (
        <CalendarContext.Provider value={props.calendarContext}>
            <ViewContext.Provider value={props.viewContext}>{props.children}</ViewContext.Provider>
        </CalendarContext.Provider>
    );
}
