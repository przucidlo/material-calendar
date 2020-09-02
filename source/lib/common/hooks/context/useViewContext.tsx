import { useState } from 'react';
import { CalendarView } from '../../api/CalendarView';
import ViewContextStructure from '../../contexts/ViewContext';

export default function useViewContext(): ViewContextStructure {
    const [highlightDate, setHighlightDate] = useState<Date>(new Date());
    const [view, setView] = useState<CalendarView | null>(null);

    return {
        highlightDate,
        view,

        setHighlightDate,
        setView,
    };
}
