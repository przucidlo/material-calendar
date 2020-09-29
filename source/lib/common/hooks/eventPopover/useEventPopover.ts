import { useContext } from 'react';
import { EventPopoverContent } from '../../api/EventPopoverContent';
import { CalendarContext } from '../../contexts/CalendarContext';
import { ViewContext } from '../../contexts/ViewContext';

export default function useEventPopover(): EventPopoverContent {
    const viewContext = useContext(ViewContext);

    if (!viewContext.view.eventPopoutContent) {
        const calendarContext = useContext(CalendarContext);

        if (calendarContext.globalEventPopoutContent) {
            return calendarContext.globalEventPopoutContent;
        }

        return undefined;
    }

    return viewContext.view.eventPopoutContent;
}
