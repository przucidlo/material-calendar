import { useState } from 'react';
import { CalendarView } from '../../api/CalendarView';
import { EventStorage } from '../../api/EventStorage';
import { CalendarContextStructure } from '../../contexts/CalendarContext';

export default function useCalendarContext(): CalendarContextStructure {
    const [eventStorage, setEventStorage] = useState<EventStorage>({});
    const [views, setViews] = useState<CalendarView[]>([]);

    return {
        eventStorage,
        views,

        setEventStorage,
        setViews,
    };
}
