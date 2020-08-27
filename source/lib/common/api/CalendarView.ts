import { ReactElement } from 'react';
import CalendarViewProps from './CalendarViewProps';
import { DateChangeAction } from './DateChangeAction';

export interface CalendarView {
    /**
     * Name of the view.
     */
    name: {
        [localName: string]: string;
    };

    /**
     * Component that represents the view.
     */
    component: (calendarViewProps: CalendarViewProps) => ReactElement<CalendarViewProps>;

    /**
     * Change the date highlighted by the calendar depending on user input.
     */
    onDateChange?: (
        dateChangeAction: DateChangeAction.BACKWARD | DateChangeAction.FORWARD,
        highlightDate: Date,
    ) => Date;
}
