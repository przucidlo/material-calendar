import CalendarEvent from './CalendarEvent';

export default interface CalendarEventStorage {
    forceReload: (calendarEvents?: CalendarEvent[]) => Promise<void>;
}
