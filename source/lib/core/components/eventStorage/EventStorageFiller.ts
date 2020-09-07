import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { EventStorage } from '../../../common/api/EventStorage';
import EventStoragePresenceHelper, { DateRange } from './EventStoragePresenceHelper';

/**
 * Class used to prefill days in instance of EventStorage interface
 * with empty arrays.
 *
 * @remarks
 * Take a note that preFillStorage method only works for date
 * ranges that are defined in EventStoragePresenceHelper class.
 *
 * @internal
 */
export default class EventStorageFiller {
    /**
     * Fills closest date range with empty arrays.
     *
     * @param from
     * @param till
     * @param eventStorage instance of EventStorage interface.
     */
    public static preFillStorage(from: Date, till: Date, eventStorage: EventStorage): EventStorage {
        // Use PresenceHelper to determine DateRange that is the closest to the one provided by user.
        const dateRange: DateRange = EventStoragePresenceHelper.determineRange(from, till);

        switch (dateRange) {
            case DateRange.DAY:
                return this.fillDay(from, eventStorage);
            case DateRange.WEEK:
                return this.fillWeek(from, eventStorage);
            case DateRange.MONTH:
                return this.fillMonth(from, eventStorage);
            case DateRange.YEAR:
                return this.fillYear(from, eventStorage);
            default:
                return eventStorage;
        }
    }

    /**
     * Fills a single day with empty array.
     *
     * @param dayDate day that will be filled with empty array.
     * @param eventStorage instance of EventStorage interface.
     */
    private static fillDay(dayDate: Date, eventStorage: EventStorage): EventStorage {
        let eventStorageCopy = eventStorage;

        const year = dayDate.getFullYear();
        const month = dayDate.getMonth();
        const day = dayDate.getDate();

        if (eventStorageCopy[dayDate.getFullYear()]?.[dayDate.getMonth()]?.[dayDate.getDate()] === undefined) {
            eventStorageCopy[year] = {
                ...eventStorageCopy[year],
                [month]: {
                    ...eventStorageCopy[year]?.[month],
                    [day]: [],
                },
            };
        }

        return eventStorageCopy;
    }

    /**
     * Fills days in week with empty array.
     *
     * @param weekDay any day of target week.
     * @param eventStorage instance of EventStorage interface.
     */
    private static fillWeek(weekDay: Date, eventStorage: EventStorage): EventStorage {
        const weekDays: Date[] = eachDayOfInterval({ start: startOfWeek(weekDay), end: endOfWeek(weekDay) });

        for (let day of weekDays) {
            this.fillDay(day, eventStorage);
        }

        return eventStorage;
    }

    /**
     * Fills days in month with empty array.
     *
     * @param monthDay any day of target month
     * @param eventStorage instance of EventStorage interface.
     */
    private static fillMonth(monthDay: Date, eventStorage: EventStorage): EventStorage {
        const monthDays: Date[] = eachDayOfInterval({ start: startOfMonth(monthDay), end: endOfMonth(monthDay) });
        let storageCopy = eventStorage;

        for (let day of monthDays) {
            storageCopy = this.fillDay(day, storageCopy);
        }

        return storageCopy;
    }

    private static fillYear(yearDay: Date, eventStorage: EventStorage): EventStorage {
        throw new Error('Not implemented');
    }
}
