import {
    addDays,
    addMonths,
    addWeeks,
    addYears,
    endOfDay,
    endOfMonth,
    endOfWeek,
    startOfDay,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { CalendarView } from '../common/api/CalendarView';
import DayView from './day/DayView';
import MonthView from './month/MonthView';
import WeekView from './week/WeekView';
import YearView from './year/YearView';

const defaultViews: CalendarView[] = [
    {
        name: {
            'pl-PL': 'Dzień',
        },
        component: DayView,
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
            'pl-PL': 'Tydzień',
        },
        component: WeekView,
        onDateChange: (dateChangeAction, highlightDate) => addWeeks(highlightDate, dateChangeAction),
        getDateRange: (highlightDate) => {
            return {
                from: startOfWeek(highlightDate),
                till: endOfWeek(highlightDate),
            };
        },
    },
    {
        name: {
            'pl-PL': 'Miesiąc',
        },
        component: MonthView,
        onDateChange: (dateChangeAction, highlightDate) => addMonths(highlightDate, dateChangeAction),
        getDateRange: (highlightDate) => {
            return {
                from: startOfMonth(highlightDate),
                till: endOfMonth(highlightDate),
            };
        },
    },
    // ********************************************
    // THIS VIEW IS STILL IN EXPERIMENTAL PHASE,
    // SO IT'S NOT YET A PART OF DEFAULT VIEWS
    // ********************************************
    //
    // {
    //     name: {
    //         'pl-PL': 'Harmonogram',
    //     },
    //     component: ScheduleView,
    //     onDateChange: (dateChangeAction, highlightDate) => addMonths(highlightDate, dateChangeAction),
    //     getDateRange: (highlightDate) => {
    //         return {
    //             from: startOfMonth(highlightDate),
    //             till: endOfMonth(highlightDate),
    //         };
    //     },
    // },
    {
        name: {
            'pl-PL': 'Rok',
        },
        component: YearView,
        getHighlightDateDescription: (date: Date) => {
            return String(date.getFullYear());
        },
        onDateChange: (dateChangeAction, highlightDate) => addYears(highlightDate, dateChangeAction),
        getDateRange: (highlightDate) => {
            return {
                from: startOfDay(highlightDate),
                till: endOfDay(highlightDate),
            };
        },
    },
];

export default defaultViews;
