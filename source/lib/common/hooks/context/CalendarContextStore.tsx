import { useState } from 'react';
import { LocaleSource } from '../../../locale/Localization';
import { CalendarView } from '../../api/CalendarView';
import { DEFAULT_CALENDAR_CONTEXT } from '../../contexts/CalendarContext';

export const CalendarContextStore = (userViews: CalendarView[]) => {
    const [locale, setLocale] = useState<string>(DEFAULT_CALENDAR_CONTEXT.locale);
    const [localeSource, setLocaleSource] = useState<LocaleSource>(DEFAULT_CALENDAR_CONTEXT.localeSource);
    const [views, setViews] = useState<CalendarView[]>(userViews);

    return {
        locale,
        localeSource,
        views,

        setLocale,
        setLocaleSource,
        setViews,
    };
};

export default CalendarContextStore;
