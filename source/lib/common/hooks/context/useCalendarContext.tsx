import { useState } from 'react';
import { LocaleSource } from '../../../locale/Localization';
import { CalendarView } from '../../api/CalendarView';
import { CalendarContextStructure, DEFAULT_CALENDAR_CONTEXT } from '../../contexts/CalendarContext';

export default function useCalendarContext(): CalendarContextStructure {
    const [locale, setLocale] = useState<string>(DEFAULT_CALENDAR_CONTEXT.locale);
    const [localeSource, setLocaleSource] = useState<LocaleSource>(DEFAULT_CALENDAR_CONTEXT.localeSource);
    const [views, setViews] = useState<CalendarView[]>(DEFAULT_CALENDAR_CONTEXT.views);

    return {
        locale,
        localeSource,
        views,

        setLocale,
        setLocaleSource,
        setViews,
    };
}
