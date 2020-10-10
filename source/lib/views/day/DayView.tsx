import React, { ReactElement, useContext } from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import { EventStorageContext } from '../../common/contexts/EventStorageContext';
import { ViewContext } from '../../common/contexts/ViewContext';
import CalendarEventUtils from '../../common/tools/CalendarEventUtils';
import DayContent from './components/dayContent/DayContent';
import DayHeader from './components/dayHeader/DayHeader';

export default function DayView(): ReactElement {
    const eventStorageContext = useContext(EventStorageContext);
    const viewContext = useContext(ViewContext);

    /**
     * Loads events from EventStorage based on highlightDate.
     *
     * If there is no events for that day function will
     * return empty array.
     */
    function getEvents(): CalendarEvent[] {
        const dayEvents = CalendarEventUtils.getDayEvents(eventStorageContext.eventStorage, viewContext.highlightDate);

        return dayEvents ? dayEvents : [];
    }

    return (
        <div>
            <DayHeader highlightDate={viewContext.highlightDate} headerContentLeftOffset={56} />
            <DayContent events={getEvents()} highlightDate={viewContext.highlightDate}/>
        </div>
    );
}
