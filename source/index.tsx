import { endOfMonth, isWithinInterval, startOfMonth } from 'date-fns';
import { addMinutes } from 'date-fns/esm';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CalendarEvent from './lib/common/api/CalendarEvent';
import { CalendarView } from './lib/common/api/CalendarView';
import ExamplePopover from './lib/common/components/examplePopover/ExamplePopover';
import MaterialCalendar from './lib/core/MaterialCalendar';
import defaultViews from './lib/views/DefaultViews';

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function genenerateMockEvents(relativeToDate: Date) {
    let events: CalendarEvent[] = [];

    for (let i = 0; i < 150; i++) {
        const date = randomDate(startOfMonth(relativeToDate), endOfMonth(relativeToDate));

        events.push({
            id: i,
            title: 'Mock Event',
            startedAt: date,
            finishedAt: addMinutes(date, Math.random() * (120 - 30) + 30),
        });
    }
    //
    return events;
}

function createTestViews(): CalendarView[] {
    return defaultViews;
}

function getCalendarEventsInRange(from: Date, till: Date, calendarEvents: CalendarEvent[]): CalendarEvent[] {
    return calendarEvents.filter((event) => {
        if (isWithinInterval(event.startedAt, { start: from, end: till })) {
            return event;
        }
    });
}

const mockEvents = genenerateMockEvents(new Date());

ReactDOM.render(
    <MaterialCalendar
        onDataRequest={(from, till) => Promise.resolve(getCalendarEventsInRange(from, till, mockEvents))}
        lazyLoading={true}
        globalEventPopoutContent={ExamplePopover}
    />,
    document.getElementById('root'),
);
