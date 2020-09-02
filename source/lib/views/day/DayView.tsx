import React, { useContext } from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import { CalendarContext } from '../../common/contexts/CalendarContext';
import { ViewContext } from '../../common/contexts/ViewContext';
import TimeGrid from '../../core/components/timeGrid/TimeGrid';
import DayGrid from './DayGrid';
import DayHead from './DayHead';

export interface DayViewProps extends CalendarViewProps {}

export default function DayView(props: DayViewProps) {
    const calendarContext = useContext(CalendarContext);
    const viewContext = useContext(ViewContext);

    /**
     * Fetches events of displayed day from eventStorage.
     *
     * If there is no events for that day function will
     * return empty array.
     */
    function getDayEvents(): CalendarEvent[] {
        const dayDate: Date = viewContext.highlightDate;
        const dayEvents =
            calendarContext.eventStorage?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[dayDate.getDate()];

        return dayEvents ? dayEvents : [];
    }

    return (
        <div>
            <DayHead highlightDate={viewContext.highlightDate} />
            <div
                style={{
                    overflowY: 'scroll',
                    height: `calc(100vh - 64px - 97px)`,
                    display: 'flex',
                    position: 'relative',
                }}
            >
                <TimeGrid gridElementHeight={48} width={48} />
                <div style={{ height: '100%', flexGrow: 1 }}>
                    <DayGrid dayEvents={getDayEvents()} />
                </div>
            </div>
        </div>
    );
}
