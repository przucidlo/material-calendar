import { useState } from 'react';
import { CalendarView } from '../../../common/api/CalendarView';
import CalendarEventStorage from '../eventStorage/CalendarEventStorage';
import { CalendarState } from './CalendarState';

/**
 * Hook that stores state of the calendar and returns instance of CalendarState interface.
 */
export default function useCalendarState() {
    const [highlightDate, setHighlightDate] = useState<Date>(new Date());
    const [eventStorage, setEventStorage] = useState<CalendarEventStorage | null>(null);
    const [currentView, setCurrentView] = useState<CalendarView | null>(null);

    /*
     * Create and return instance of class that implements CalendarState.
     */
    return new (class implements CalendarState {
        public setHighlightDate(highlightDate: Date) {
            setHighlightDate(highlightDate);
        }

        public getHighlightDate() {
            return highlightDate;
        }

        public setEventStorage(eventStorage: CalendarEventStorage) {
            setEventStorage(eventStorage);
        }

        public getEventStorage() {
            return eventStorage;
        }

        public setCurrentView(currentView: CalendarView) {
            setCurrentView(currentView);
        }

        public getCurrentView() {
            return currentView;
        }
    })();
}
