import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement, useContext } from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import { CalendarContext, CalendarContextStructure } from '../../common/contexts/CalendarContext';
import ViewContextStructure, { ViewContext } from '../../common/contexts/ViewContext';
import TimeGrid from '../../core/components/timeGrid/TimeGrid';
import DayGrid from '../day/components/dayGrid/DayGrid';
import DayHeader from '../day/components/dayHeader/DayHeader';

interface WeekViewProps extends CalendarViewProps {}

function WeekView(props: WeekViewProps): ReactElement {
    const calendarContext: CalendarContextStructure = useContext(CalendarContext);
    const viewContext: ViewContextStructure = useContext(ViewContext);

    const daysBetween = eachDayOfInterval({
        start: startOfWeek(viewContext.highlightDate),
        end: endOfWeek(viewContext.highlightDate),
    });

    function displayWeekHeadSection() {
        return daysBetween.map((day, index) => {
            return (
                <div key={index} style={{ flexGrow: 1, flexBasis: 0 }}>
                    <DayHeader center highlightDate={day} intendHoursGap={index === 0} />
                </div>
            );
        });
    }

    function getDayEvents(dayDate: Date): CalendarEvent[] {
        const dayEvents =
            calendarContext.eventStorage?.[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[dayDate.getDate()];

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
            <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 56, paddingRight: 16 }}>
                {displayWeekHeadSection()}
            </div>
            <div style={{ overflowY: 'scroll', height: `calc(100vh - 64px - 89px)` }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TimeGrid gridElementHeight={49} width={56} />
                    {displayWeekGridSection()}
                </div>
            </div>
        </div>
    );
}

export default WeekView;
