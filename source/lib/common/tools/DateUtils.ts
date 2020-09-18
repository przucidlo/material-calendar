import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, getWeeksInMonth, startOfMonth } from 'date-fns';

export default class DateUtils {
    /**
     * Get days of weeks that belong to given month.
     */
    public static getWeeksDaysOfMonth(date: Date): Date[] {
        const startsOfWeeks: Date[] = eachWeekOfInterval({
            start: startOfMonth(date),
            end: endOfMonth(date),
        });

        let days: Date[] = [];

        for (let weekStart of startsOfWeeks) {
            days = [...days, ...eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) })];
        }

        return days;
    }
}
