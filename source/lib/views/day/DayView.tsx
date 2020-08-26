import React from 'react';
import CalendarEvent from '../../core/components/eventStorage/CalendarEvent';
import { EventStorage } from '../../core/components/eventStorage/CalendarEventStorage';
import CalendarTimeGrid from '../../core/components/timeGrid/CalendarTimeGrid';
import DayGrid from './DayGrid';
import DayHead from './DayHead';

export interface DayViewProps {
    focusedDate: Date;
    eventStorage: EventStorage;
}

export default function DayView(props: DayViewProps) {
    /**
     * Fetches events of displayed day from eventStorage.
     *
     * If there is no events for that day function will
     * return empty array.
     */
    function getDayEvents(): CalendarEvent[] {
        const dayDate: Date = props.focusedDate;
        const dayEvents = props.eventStorage?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[dayDate.getDate()];

        return dayEvents ? dayEvents : [];
    }

    return (
        <div>
            <DayHead {...props} />
            <div
                style={{
                    overflowY: 'scroll',
                    height: `calc(100vh - 64px - 97px)`,
                    display: 'flex',
                    position: 'relative',
                }}
            >
                <CalendarTimeGrid gridElementHeight={48} width={48} />
                <div style={{ height: '100%', flexGrow: 1 }}>
                    <DayGrid dayEvents={getDayEvents()} />
                </div>
            </div>
        </div>
    );
}
