import React from 'react';
import localeList from '../../language/LocaleList';
import { CalendarView } from '../api/CalendarView';
import { EventStorage } from '../api/EventStorage';

export interface CalendarContextStructure {
    locale: string;
    eventStorage: EventStorage;
    views: CalendarView[];

    setLocale: (locale: string) => void;
    setEventStorage: (eventStorage: EventStorage) => void;
    setViews: (views: CalendarView[]) => void;
}

const DEFAULT_CONTEXT: CalendarContextStructure = {
    locale: localeList.enUS,
    eventStorage: {},
    views: [],

    setLocale: () => {},
    setEventStorage: () => {},
    setViews: () => {},
};

export const CalendarContext = React.createContext<CalendarContextStructure>(DEFAULT_CONTEXT);
