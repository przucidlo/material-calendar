import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { EventStorage } from '../../../common/api/EventStorage';
import EventStoragePresenceHelper, { DateRange } from './EventStoragePresenceHelper';

export default class EventStorageFiller {
    public static preFillStorage(from: Date, till: Date, eventStorage: EventStorage): EventStorage {
        let dateRange: DateRange = EventStoragePresenceHelper.determineRange(from, till);

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

    private static fillWeek(weekDay: Date, eventStorage: EventStorage): EventStorage {
        const weekDays: Date[] = eachDayOfInterval({ start: startOfWeek(weekDay), end: endOfWeek(weekDay) });

        for (let day of weekDays) {
            this.fillDay(day, eventStorage);
        }

        return eventStorage;
    }

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
