import React, { ReactNode } from 'react';
import { CalendarView } from '../../../common/api/CalendarView';
import { CalendarContext } from '../../../common/contexts/CalendarContext';
import { EventStorageContext } from '../../../common/contexts/EventStorageContext';
import { ViewContext } from '../../../common/contexts/ViewContext';
import CalendarContextStore from '../../../common/hooks/context/CalendarContextStore';
import EventStorageContextStore from '../../../common/hooks/context/EventStorageContextStore';
import { ViewContextStore } from '../../../common/hooks/context/ViewContextStore';

export interface ContextWrapperProps {
    /**
     * List of views that will be used by the calendar.
     * If none are provided, It will use the default ones.
     */
    views?: CalendarView[];

    children: ReactNode;
}

/**
 * Wraps context providers used by calendar to one
 * component and requires their values in props.
 *
 * @internal
 */
export default function ContextWrapper(props: ContextWrapperProps) {
    function getDefaultView(): CalendarView | null {
        if (props.views && props.views.length > 0) {
            return props.views[0];
        }
        return null;
    }

    return (
        <CalendarContext.Provider value={CalendarContextStore(props.views ? props.views : [])}>
            <ViewContext.Provider value={ViewContextStore(getDefaultView())}>
                <EventStorageContext.Provider value={EventStorageContextStore()}>
                    {props.children}
                </EventStorageContext.Provider>
            </ViewContext.Provider>
        </CalendarContext.Provider>
    );
}
