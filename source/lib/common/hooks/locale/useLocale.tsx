import { useContext } from 'react';
import { LocalizationElements } from '../../api/LocalizationElements';
import { CalendarContext, CalendarContextStructure } from '../../contexts/CalendarContext';

export default function useLocale(): LocalizationElements {
    const calendarContext: CalendarContextStructure = useContext(CalendarContext);

    return calendarContext.localeSource[calendarContext.locale];
}
