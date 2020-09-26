import { useContext } from 'react';
import { LocalizationElements } from '../../api/LocalizationElements';
import { CalendarContext } from '../../contexts/CalendarContext';

export default function useLocale(): LocalizationElements {
    const calendarContext = useContext(CalendarContext);

    return calendarContext.localeSource[calendarContext.locale];
}
