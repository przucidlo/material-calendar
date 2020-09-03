import React from 'react';
import { CalendarView } from '../api/CalendarView';
import { EventStorage } from '../api/EventStorage';

export interface CalendarContextStructure {
    eventStorage: EventStorage;
    views: CalendarView[];

    setEventStorage: (eventStorage: EventStorage) => void;
    setViews: (views: CalendarView[]) => void;
}

const DEFAULT_CONTEXT: CalendarContextStructure = {
    eventStorage: {},
    views: [],

    setEventStorage: () => {},
    setViews: () => {},
};

export const CalendarContext = React.createContext<CalendarContextStructure>(DEFAULT_CONTEXT);
