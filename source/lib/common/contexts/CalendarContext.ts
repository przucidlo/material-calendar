import React from 'react';
import localeList from '../../locale/LocaleList';
import localization, { LocaleSource } from '../../locale/Localization';
import { CalendarView } from '../api/CalendarView';
import { EventStorage } from '../api/EventStorage';

export interface CalendarContextStructure {
    locale: string;
    localeSource: LocaleSource;

    eventStorage: EventStorage;
    views: CalendarView[];

    setLocale: (locale: string) => void;
    setLocaleSource: (localeSource: LocaleSource) => void;
    setEventStorage: (eventStorage: EventStorage) => void;
    setViews: (views: CalendarView[]) => void;
}

const DEFAULT_CONTEXT: CalendarContextStructure = {
    locale: localeList.enUS,
    localeSource: localization,

    eventStorage: {},
    views: [],

    setLocale: () => {},
    setLocaleSource: () => {},
    setEventStorage: () => {},
    setViews: () => {},
};

export const CalendarContext = React.createContext<CalendarContextStructure>(DEFAULT_CONTEXT);
