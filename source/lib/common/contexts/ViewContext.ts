import React from 'react';
import { CalendarView } from '../api/CalendarView';

export default interface ViewContextStructure {
    highlightDate: Date;
    view: CalendarView | null;

    setHighlightDate: (highlightDate: Date) => void;
    setView: (view: CalendarView) => void;
}

const DEFAULT_CONTEXT: ViewContextStructure = {
    highlightDate: new Date(),
    view: null,

    setHighlightDate: () => {},
    setView: () => {},
};

export const ViewContext = React.createContext<ViewContextStructure>(DEFAULT_CONTEXT);
