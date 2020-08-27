import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import CalendarState from '../../core/components/calendarState/CalendarState';
import CalendarTimeGrid from '../../core/components/timeGrid/CalendarTimeGrid';
import DayGrid from '../day/DayGrid';
import DayHead from '../day/DayHead';

interface WeekViewProps extends CalendarViewProps {}

function WeekView(props: WeekViewProps): ReactElement {
    const calendarState: CalendarState = props.calendarState;

    const daysBetween = eachDayOfInterval({
        start: startOfWeek(calendarState.getHighlightDate()),
        end: endOfWeek(calendarState.getHighlightDate()),
    });

    function displayWeekHeadSection() {
        return daysBetween.map((day, index) => {
            return (
                <div key={index} style={{ flexGrow: 1, flexBasis: 0 }}>
                    <DayHead center highlightDate={day} intendHoursGap={index === 0} />
                </div>
            );
        });
    }

    function getDayEvents(dayDate: Date): CalendarEvent[] {
        const dayEvents = calendarState.getEventStorage()?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[
            dayDate.getDate()
        ];

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
