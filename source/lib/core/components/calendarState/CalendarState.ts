import { CalendarView } from '../../../common/api/CalendarView';
import { EventStorage } from '../eventStorage/CalendarEventStorage';

/**
 * Interface that represents getters and setters
 * for state fields of the calendar.
 */
export interface CalendarState {
    setHighlightDate: (highlightDate: Date) => void;
    getHighlightDate: () => Date;

    setEventStorage: (eventStorage: EventStorage) => void;
    getEventStorage: () => EventStorage | null;

    setCurrentView: (currentView: CalendarView) => void;
    getCurrentView: () => CalendarView | null;
}
