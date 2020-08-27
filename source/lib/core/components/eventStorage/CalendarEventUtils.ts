import CalendarEvent from '../../../common/api/CalendarEvent';
import { EventStorage } from '../../../common/api/EventStorage';

export default class CalendarEventUtils {
    public static getDayEvents(eventStorage: EventStorage, date: Date): CalendarEvent[] {
        const dayEvents = eventStorage?.[date.getFullYear()]?.[date.getMonth()]?.[date.getDate()];

        return dayEvents ? dayEvents : [];
    }

    public static getMonthEvents(eventStorage: EventStorage, date: Date): CalendarEvent[] {
        const monthEvents = eventStorage?.[date.getFullYear()]?.[date.getMonth()];
        let calendarEvents: CalendarEvent[] = [];

        if (monthEvents) {
            for (let day of Object.values(monthEvents)) {
                calendarEvents.push(...day);
            }

            return calendarEvents;
        }
        return [];
    }
}
