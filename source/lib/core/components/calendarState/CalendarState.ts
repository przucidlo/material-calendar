import { CalendarView } from '../../../common/api/CalendarView';
import { EventStorage } from '../../../common/api/EventStorage';

/**
 * Interface that represents getters and setters
 * for state fields of the calendar.
 */
export default interface CalendarState {
    setHighlightDate: (highlightDate: Date) => void;
    getHighlightDate: () => Date;

    setEventStorage: (eventStorage: EventStorage) => void;
    getEventStorage: () => EventStorage | null;

    setCurrentView: (currentView: CalendarView) => void;
    getCurrentView: () => CalendarView | null;

    setViews: (views: CalendarView[]) => void;
    getViews: () => CalendarView[];
}
