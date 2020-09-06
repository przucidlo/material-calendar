import { differenceInMinutes } from 'date-fns/esm';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import DayEvent from './DayEvent';

export interface DayEventGridProps {
    dayEvents: CalendarEvent[];
}

export default function DayEventGrid(props: DayEventGridProps): ReactElement {
    const elementSize = 48;
    const rowHourRatio = elementSize / 60;

    function renderDayEvents(): ReactElement[] {
        return props.dayEvents.map((calendarEvent) => (
            <div key={calendarEvent.startedAt.toTimeString()}>
                <DayEvent
                    calendarEvent={calendarEvent}
                    positionTop={calculateElementPosition(calendarEvent.startedAt)}
                    height={calculateElementHeight(calendarEvent.startedAt, calendarEvent.finishedAt)}
                />
            </div>
        ));
    }

    function calculateElementHeight(startedAt: Date, finishedAt: Date): number {
        const durationInMinutes = differenceInMinutes(finishedAt, startedAt);
        const result = rowHourRatio * durationInMinutes;

        if (result <= elementSize / 2) return elementSize / 2;

        return result;
    }

    function calculateElementPosition(startedAt: Date): number {
        return (startedAt.getHours() + startedAt.getMinutes() / 60) * elementSize;
    }

    return (
        <div>
            <div style={{ position: 'absolute', width: '100%', left: 0, top: 0, right: 0, bottom: 0 }}>
                {renderDayEvents()}
            </div>
        </div>
    );
}
