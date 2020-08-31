import { useState } from 'react';
import { CalendarView } from '../../../common/api/CalendarView';
import { EventStorage } from '../../../common/api/EventStorage';
import CalendarState from './CalendarState';

/**
 * Hook that stores state of the calendar and returns instance of CalendarState interface.
 */
export default function useCalendarState(): CalendarState {
    const [highlightDate, setHighlightDate] = useState<Date>(new Date());
    const [eventStorage, setEventStorage] = useState<EventStorage | null>(null);
    const [currentView, setCurrentView] = useState<CalendarView | null>(null);
    const [views, setViews] = useState<CalendarView[]>([]);

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

        public setEventStorage(eventStorage: EventStorage) {
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

        public setViews(views: CalendarView[]) {
            setViews(views);
        }

        public getViews() {
            return views;
        }
    })();
}
