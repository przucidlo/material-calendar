import DayView from '../views/day/DayView';
import MonthView from '../views/month/MonthView';
import ScheduleView from '../views/schedule/ScheduleView';
import WeekView from '../views/week/WeekView';

const CALENDAR_VIEWS: { [key: string]: any } = {
    day: DayView,
    week: WeekView,
    month: MonthView,
    schedule: ScheduleView,
};

export default CALENDAR_VIEWS;
