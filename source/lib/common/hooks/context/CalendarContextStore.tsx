import { ComponentClass, FunctionComponent, useState } from 'react';
import { LocaleSource } from '../../../locale/Localization';
import { CalendarView } from '../../api/CalendarView';
import { DEFAULT_CALENDAR_CONTEXT } from '../../contexts/CalendarContext';

export interface CalendarContextStoreProps {
    userViews: CalendarView[];
    globalEventPopoutContent?: FunctionComponent<any> | ComponentClass<any, any>;
}

export const CalendarContextStore = (props: CalendarContextStoreProps) => {
    const [locale, setLocale] = useState<string>(DEFAULT_CALENDAR_CONTEXT.locale);
    const [localeSource, setLocaleSource] = useState<LocaleSource>(DEFAULT_CALENDAR_CONTEXT.localeSource);
    const [views, setViews] = useState<CalendarView[]>(props.userViews);
    const [globalEventPopoutContent, setGlobalEventPopoutContent] = useState<
        FunctionComponent<any> | ComponentClass<any, any> | undefined
    >(props.globalEventPopoutContent);

    return {
        locale,
        localeSource,
        globalEventPopoutContent,
        views,

        setLocale,
        setLocaleSource,
        setGlobalEventPopoutContent,
        setViews,
    };
};

export default CalendarContextStore;
