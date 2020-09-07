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

/**
 * Class used to check if closest DayRange to interval provided
 * by user is filled with empty arrays.
 *
 * @privateRemarks
 * The idea of strict DateRanges might not be the most flexible
 * one, since it was made based on default views provided by calendar.
 * Might need a little refractor in future if custom views will require it.
 *
 * @internal
 */
export default class EventStoragePresenceHelper {
    /**
     * Checks if each day in determined DateRange has array assigned to it.
     *
     * @param from
     * @param till
     * @param eventStorage
     *
     * @returns true if data is present.
     */
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

    /**
     * Returns first DateRange that given interval fits between.
     *
     * @param from
     * @param till
     */
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
