import { isSameDay, isSameMonth, isSameWeek, isSameYear } from 'date-fns';
import { EventStorage } from '../../../common/api/EventStorage';

enum DateRange {
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
    // TEST CONSTUCTOR
    constructor() {}

    public static isDataPresent(from: Date, till: Date, eventStorage: EventStorage) {
        let dateRange: DateRange = this.determineRange(from, till);

        switch (dateRange) {
            case DateRange.DAY:
                return this.isDayPresent(from, eventStorage);
            case DateRange.WEEK:
                return this.isWeekPresent(from);
            case DateRange.MONTH:
                return this.isMonthPresent(from);
            case DateRange.YEAR:
                return this.isYearPresent(from);
            default:
                return false;
        }
    }

    private static determineRange(from: Date, till: Date): DateRange {
        for (let range in DateRange) {
            if (!isNaN(Number(range))) {
                if (dateRangeCheckers[range](from, till)) {
                    return (range as unknown) as number;
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

    private static isWeekPresent(weekDay: Date): boolean {
        return false;
    }

    private static isMonthPresent(monthDay: Date): boolean {
        return false;
    }

    private static isYearPresent(yearDay: Date): boolean {
        return false;
    }
}
