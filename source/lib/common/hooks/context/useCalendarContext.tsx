import { useState } from 'react';
import { LocaleSource } from '../../../locale/Localization';
import { CalendarView } from '../../api/CalendarView';
import { EventStorage } from '../../api/EventStorage';
import { CalendarContextStructure, DEFAULT_CALENDAR_CONTEXT } from '../../contexts/CalendarContext';

export default function useCalendarContext(): CalendarContextStructure {
    const [locale, setLocale] = useState<string>(DEFAULT_CALENDAR_CONTEXT.locale);
    const [localeSource, setLocaleSource] = useState<LocaleSource>(DEFAULT_CALENDAR_CONTEXT.localeSource);
    const [eventStorage, setEventStorage] = useState<EventStorage>(DEFAULT_CALENDAR_CONTEXT.eventStorage);
    const [views, setViews] = useState<CalendarView[]>(DEFAULT_CALENDAR_CONTEXT.views);

    return {
        locale,
        localeSource,
        eventStorage,
        views,

        setLocale,
        setLocaleSource,
        setEventStorage,
        setViews,
    };
}
