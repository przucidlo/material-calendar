import React, { ReactElement, useContext } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import { CalendarContext, CalendarContextStructure } from '../../../../common/contexts/CalendarContext';
import TimeGrid from '../../../../core/components/timeGrid/TimeGrid';
import DayGrid from '../../../day/components/dayGrid/DayGrid';

interface WeekGridProps {
    weekDays: Date[];
}

export default function WeekGrid(props: WeekGridProps): ReactElement {
    const calendarContext: CalendarContextStructure = useContext(CalendarContext);

    function displayWeekGridSection() {
        return props.weekDays.map((day, index) => {
            return (
                <div key={'1-' + index} style={{ flexGrow: 1, flexBasis: 0 }}>
                    <DayGrid dayEvents={getDayEvents(day)} />
                </div>
            );
        });
    }

    function getDayEvents(dayDate: Date): CalendarEvent[] {
        const dayEvents =
            calendarContext.eventStorage?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[dayDate.getDate()];

        return dayEvents ? dayEvents : [];
    }

    return (
        <div style={{ overflowY: 'scroll', height: `calc(100vh - 64px - 89px)` }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TimeGrid gridElementHeight={49} width={56} />
                {displayWeekGridSection()}
            </div>
        </div>
    );
}
