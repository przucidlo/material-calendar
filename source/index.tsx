import {
    addDays,
    addWeeks,
    endOfMonth,
    endOfWeek,
    endOfYear,
    isWithinInterval,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
} from 'date-fns';
import { addMinutes, addMonths, endOfDay } from 'date-fns/esm';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CalendarEvent from './lib/common/api/CalendarEvent';
import { CalendarView } from './lib/common/api/CalendarView';
import CalendarViewProps from './lib/common/api/CalendarViewProps';
import MaterialCalendar from './lib/core/MaterialCalendar';
import DayView from './lib/views/day/DayView';
import MonthView from './lib/views/month/MonthView';
import WeekView from './lib/views/week/WeekView';

function MockCalendarView(mockViewProps: CalendarViewProps) {
    return <div>ab</div>;
}

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function genenerateMockEvents(relativeToDate: Date) {
    let events: CalendarEvent[] = [];

    for (let i = 0; i < 150; i++) {
        const date = randomDate(startOfYear(relativeToDate), endOfYear(relativeToDate));

        events.push({
            id: i,
            title: 'Mock Event',
            startedAt: date,
            finishedAt: addMinutes(date, 60),
        });
    }

    return events;
}

function createTestViews(): CalendarView[] {
    let calendarView: CalendarView = {
        name: {
            pl: 'Miesiąc',
        },
        component: (calendarViewProps) => <MonthView {...calendarViewProps} />,
        onDateChange: (dateChangeAction, highlightDate) => addMonths(highlightDate, dateChangeAction),
        getDateRange: (highlightDate) => {
            return {
                from: startOfMonth(highlightDate),
                till: endOfMonth(highlightDate),
            };
        },
    };

    return [
        {
            name: {
                pl: 'Dzień',
            },
            component: (calendarViewProps) => <DayView {...calendarViewProps} />,
            onDateChange: (dateChangeAction, highlightDate) => addDays(highlightDate, dateChangeAction),
            getDateRange: (highlightDate) => {
                return {
                    from: startOfDay(highlightDate),
                    till: endOfDay(highlightDate),
                };
            },
        },
        {
            name: {
                pl: 'Tydzień',
            },
            component: (calendarViewProps) => <WeekView {...calendarViewProps} />,
            onDateChange: (dateChangeAction, highlightDate) => addWeeks(highlightDate, dateChangeAction),
            getDateRange: (highlightDate) => {
                return {
                    from: startOfWeek(highlightDate),
                    till: endOfWeek(highlightDate),
                };
            },
        },
        calendarView,
    ];
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
        views={createTestViews()}
    />,
    document.getElementById('root'),
);
