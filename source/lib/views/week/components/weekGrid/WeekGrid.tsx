import React, { ReactElement, useContext } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import { EventStorageContext, EventStorageContextStructure } from '../../../../common/contexts/EventStorageContext';
import CalendarEventUtils from '../../../../common/tools/CalendarEventUtils';
import DayGrid from '../../../day/components/dayGrid/DayGrid';

interface WeekGridProps {
    weekDays: Date[];

    onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

export default function WeekGrid(props: WeekGridProps): ReactElement {
    const eventStorageContext: EventStorageContextStructure = useContext(EventStorageContext);

    function displayWeekGridSection() {
        return props.weekDays.map((day, index) => {
            return (
                <div key={'1-' + index} style={{ flexGrow: 1, minWidth: '107px' }}>
                    <DayGrid dayEvents={getDayEvents(day)} />
                </div>
            );
        });
    }

    function getDayEvents(dayDate: Date): CalendarEvent[] {
        const dayEvents = CalendarEventUtils.getDayEvents(eventStorageContext.eventStorage, dayDate);

        return dayEvents ? dayEvents : [];
    }

    return (
        <div style={{ overflow: 'auto', height: `calc(100vh - 64px - 89px)` }} onScroll={props.onScroll}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>{displayWeekGridSection()}</div>
        </div>
    );
}
