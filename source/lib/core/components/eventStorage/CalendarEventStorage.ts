import { addDays, endOfMonth, startOfMonth, subDays } from 'date-fns';
import CalendarEvent from './CalendarEvent';

export interface EventStorageMonth {
    [day: number]: CalendarEvent[];
}

export interface EventStorageYear {
    [month: number]: EventStorageMonth;
}

export interface EventStorage {
    [year: number]: EventStorageYear;
}

// TODO: Convert CalendarEvent[] to EventStorage
export default class CalendarEventStorage {
    private focusedDate: Date;
    private selectedView: string;
    private onDataRequest: (from: Date, till: Date) => Promise<CalendarEvent[]>;
    private setEventStorage: (eventStorage: EventStorage) => void;

    /**
     *
     * @param focusedDate Currently displayed date in the calendar
     * @param setEventStorage
     * @param onDataRequest
     */
    constructor(
        focusedDate: Date,
        setEventStorage: (eventStorage: EventStorage) => void,
        onDataRequest: (from: Date, till: Date) => Promise<CalendarEvent[]>,
        selectedView: string,
    ) {
        this.focusedDate = focusedDate;
        this.selectedView = selectedView;
        this.onDataRequest = onDataRequest;
        this.setEventStorage = setEventStorage;
    }

    /**
     * Loads events depending on the time range required by selected view
     */
    public async loadEvents(): Promise<void> {
        const timeRange = this.calculateLoadTimeRange(this.focusedDate);
        const events = await this.onDataRequest(timeRange.from, timeRange.till);
        const sortedEvents = this.sortEvents(events);

        this.setEventStorage(sortedEvents);
    }

    /**
     *
     */
    public setFocusedDate(focusedDate: Date): void {
        this.loadEvents();

        this.focusedDate = focusedDate;
    }

    private calculateLoadTimeRange(focusedDate: Date): { from: Date; till: Date } {
        if (this.selectedView === 'month' || 'week' || 'day') {
            const monthStart = startOfMonth(focusedDate);
            const monthEnd = endOfMonth(focusedDate);

            return {
                from: monthStart.getDay() !== 0 ? this.getMonthStartRange(monthStart) : monthStart,
                till: monthEnd.getDay() !== 6 ? this.getMonthEndRange(monthEnd) : monthEnd,
            };
        }
        return { from: new Date(), till: new Date() };
    }

    private getMonthStartRange(monthStart: Date): Date {
        return subDays(monthStart, monthStart.getDay());
    }

    private getMonthEndRange(monthEnd: Date): Date {
        const missingDays = 6 - monthEnd.getDay();
        const daysAferEndDate = addDays(monthEnd, missingDays);

        return daysAferEndDate;
    }

    private sortEvents(calendarEvents: CalendarEvent[]): EventStorage {
        let eventStorage: EventStorage = {};

        for (let event of calendarEvents) {
            const year = event.startedAt.getFullYear();
            const month = event.startedAt.getMonth();
            const day = event.startedAt.getDate();

            eventStorage[year] = {
                ...eventStorage[year],
                [month]: {
                    ...eventStorage[year]?.[month],
                    [day]: [
                        ...(eventStorage[year]?.[month]?.[day] === undefined ? [] : eventStorage[year]?.[month]?.[day]),
                        event,
                    ],
                },
            };
        }

        return eventStorage;
    }
}
