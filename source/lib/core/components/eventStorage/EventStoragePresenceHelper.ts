import {
    eachDayOfInterval,
    endOfWeek,
    getDaysInMonth,
    isSameDay,
    isSameMonth,
    isSameWeek,
    isSameYear,
    startOfWeek,
} from 'date-fns';
import { EventStorage } from '../../../common/api/EventStorage';

export enum DateRange {
    DAY,
    WEEK,
    MONTH,
    YEAR,
    YEARS,
}

const dateRangeCheckers: { [range: number]: (from: Date, till: Date) => boolean } = {
    [DateRange.DAY]: isSameDay,
    [DateRange.WEEK]: isSameWeek,
    [DateRange.MONTH]: isSameMonth,
    [DateRange.YEAR]: isSameYear,
    [DateRange.YEARS]: () => true,
};

export default class EventStoragePresenceHelper {
    public static isDataPresent(from: Date, till: Date, eventStorage: EventStorage) {
        let dateRange: DateRange = this.determineRange(from, till);

        switch (dateRange) {
            case DateRange.DAY:
                return this.isDayPresent(from, eventStorage);
            case DateRange.WEEK:
                return this.isWeekPresent(from, eventStorage);
            case DateRange.MONTH:
                return this.isMonthPresent(from, eventStorage);
            case DateRange.YEAR:
                return this.isYearPresent(from);
            default:
                return false;
        }
    }

    public static determineRange(from: Date, till: Date): DateRange {
        for (let range in DateRange) {
            if (!isNaN(Number(range))) {
                if (dateRangeCheckers[range](from, till)) {
                    return Number(range);
                }
            }
        }

        return -1;
    }

    /*
     *
     * Data parsers.
     *
     */

    private static isDayPresent(date: Date, eventStorage: EventStorage): boolean {
        return eventStorage[date.getFullYear()]?.[date.getMonth()]?.[date.getDay()] !== undefined;
    }

    private static isWeekPresent(weekDay: Date, eventStorage: EventStorage): boolean {
        const weekDays: Date[] = eachDayOfInterval({ start: startOfWeek(weekDay), end: endOfWeek(weekDay) });

        for (let day of weekDays) {
            if (!this.isDayPresent(day, eventStorage)) {
                return false;
            }
        }

        return true;
    }

    private static isMonthPresent(monthDay: Date, eventStorage: EventStorage): boolean {
        const daysInMonth: number = getDaysInMonth(monthDay);
        const storageMonth = eventStorage[monthDay.getFullYear()]?.[monthDay.getMonth()];

        return storageMonth && daysInMonth === Object.keys(storageMonth).length;
    }

    // TODO: Implement it
    private static isYearPresent(yearDay: Date): boolean {
        throw new Error('Not implemented');
    }
}
