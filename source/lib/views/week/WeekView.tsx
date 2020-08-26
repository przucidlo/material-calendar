import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../core/components/eventStorage/CalendarEvent';
import { EventStorage } from '../../core/components/eventStorage/CalendarEventStorage';
import CalendarTimeGrid from '../../core/components/timeGrid/CalendarTimeGrid';
import DayGrid from '../day/DayGrid';
import DayHead from '../day/DayHead';

interface Props {
    focusedDate: Date;
    eventStorage: EventStorage;
}

function WeekView(props: Props): ReactElement {
    const daysBetween = eachDayOfInterval({ start: startOfWeek(props.focusedDate), end: endOfWeek(props.focusedDate) });

    function displayWeekHeadSection() {
        return daysBetween.map((day, index) => {
            return (
                <div key={index} style={{ flexGrow: 1, flexBasis: 0 }}>
                    <DayHead center focusedDate={day} intendHoursGap={index === 0} />
                </div>
            );
        });
    }

    function getDayEvents(dayDate: Date): CalendarEvent[] {
        const dayEvents = props.eventStorage?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[dayDate.getDate()];

        return dayEvents ? dayEvents : [];
    }

    function displayWeekGridSection() {
        return daysBetween.map((day, index) => {
            return (
                <div key={'1-' + index} style={{ flexGrow: 1, flexBasis: 0 }}>
                    <DayGrid dayEvents={getDayEvents(day)} />
                </div>
            );
        });
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 48, paddingRight: 16 }}>
                {displayWeekHeadSection()}
            </div>
            <div style={{ overflowY: 'scroll', height: `calc(100vh - 64px - 97px)` }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <CalendarTimeGrid gridElementHeight={48} width={48} />
                    {displayWeekGridSection()}
                </div>
            </div>
        </div>
    );
}

export default WeekView;
