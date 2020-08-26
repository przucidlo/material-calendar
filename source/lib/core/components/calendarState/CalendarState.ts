import { CalendarView } from '../../../common/api/CalendarView';
import CalendarEventStorage from '../eventStorage/CalendarEventStorage';

/**
 * Interface that represents getters and setters
 * for state fields of the calendar.
 */
export interface CalendarState {
    setHighlightDate: (highlightDate: Date) => void;
    getHighlightDate: () => Date;

    setEventStorage: (eventStorage: CalendarEventStorage) => void;
    getEventStorage: () => CalendarEventStorage | null;

    setCurrentView: (currentView: CalendarView) => void;
    getCurrentView: () => CalendarView | null;
}
