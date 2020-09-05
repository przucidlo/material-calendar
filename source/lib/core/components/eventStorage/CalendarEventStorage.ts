import CalendarEvent from '../../../common/api/CalendarEvent';

export default interface CalendarEventStorage {
    forceReload: (calendarEvents?: CalendarEvent[]) => Promise<void>;
}
