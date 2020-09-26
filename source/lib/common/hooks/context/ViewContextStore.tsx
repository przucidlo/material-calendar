import { useState } from 'react';
import { CalendarView } from '../../api/CalendarView';

export const ViewContextStore = (defaultView: CalendarView | null) => {
    const [highlightDate, setHighlightDate] = useState<Date>(new Date());
    const [view, setView] = useState<CalendarView | null>(defaultView);

    return {
        highlightDate,
        view,

        setHighlightDate,
        setView,
    };
};
