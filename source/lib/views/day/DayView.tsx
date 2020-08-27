import React from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import CalendarTimeGrid from '../../core/components/timeGrid/CalendarTimeGrid';
import DayGrid from './DayGrid';
import DayHead from './DayHead';

export interface DayViewProps extends CalendarViewProps {}

export default function DayView(props: DayViewProps) {
    /**
     * Fetches events of displayed day from eventStorage.
     *
     * If there is no events for that day function will
     * return empty array.
     */
    function getDayEvents(): CalendarEvent[] {
        const dayDate: Date = props.calendarState.getHighlightDate();
        const dayEvents = props.calendarState.getEventStorage()?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[
            dayDate.getDate()
        ];

        return dayEvents ? dayEvents : [];
    }

    return (
        <div>
            <DayHead highlightDate={props.calendarState.getHighlightDate()} />
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
