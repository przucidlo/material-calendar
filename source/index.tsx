import { addYears, endOfDay, endOfYear, isWithinInterval, startOfDay, startOfYear } from 'date-fns';
import { addMinutes } from 'date-fns/esm';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CalendarEvent from './lib/common/api/CalendarEvent';
import { CalendarView } from './lib/common/api/CalendarView';
import MaterialCalendar from './lib/core/MaterialCalendar';
import YearView from './lib/views/year/YearView';
import './wdyr';

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
    return [
        // {
        //     name: {
        //         'pl-PL': 'Dzień',
        //     },
        //     component: DayView,
        //     onDateChange: (dateChangeAction, highlightDate) => addDays(highlightDate, dateChangeAction),
        //     getDateRange: (highlightDate) => {
        //         return {
        //             from: startOfDay(highlightDate),
        //             till: endOfDay(highlightDate),
        //         };
        //     },
        // },
        // {
        //     name: {
        //         'pl-PL': 'Tydzień',
        //     },
        //     component: WeekView,
        //     onDateChange: (dateChangeAction, highlightDate) => addWeeks(highlightDate, dateChangeAction),
        //     getDateRange: (highlightDate) => {
        //         return {
        //             from: startOfWeek(highlightDate),
        //             till: endOfWeek(highlightDate),
        //         };
        //     },
        // },
        // {
        //     name: {
        //         'pl-PL': 'Miesiąc',
        //     },
        //     component: MonthView,
        //     onDateChange: (dateChangeAction, highlightDate) => addMonths(highlightDate, dateChangeAction),
        //     getDateRange: (highlightDate) => {
        //         return {
        //             from: startOfMonth(highlightDate),
        //             till: endOfMonth(highlightDate),
        //         };
        //     },
        // },
        // {
        //     name: {
        //         'pl-PL': 'Harmonogram',
        //     },
        //     component: ScheduleView,
        //     onDateChange: (dateChangeAction, highlightDate) => addDays(highlightDate, dateChangeAction),
        //     getDateRange: (highlightDate) => {
        //         return {
        //             from: startOfDay(highlightDate),
        //             till: endOfDay(highlightDate),
        //         };
        //     },
        // },
        {
            name: {
                'pl-PL': 'Rok',
            },
            component: YearView,
            onDateChange: (dateChangeAction, highlightDate) => addYears(highlightDate, dateChangeAction),
            getDateRange: (highlightDate) => {
                return {
                    from: startOfDay(highlightDate),
                    till: endOfDay(highlightDate),
                };
            },
        },
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
        views={createTestViews()}
        onDataRequest={(from, till) => Promise.resolve(getCalendarEventsInRange(from, till, mockEvents))}
        lazyLoading={true}
    />,
    document.getElementById('root'),
);
