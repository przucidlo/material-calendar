import { ReactElement } from 'react';
import CalendarViewProps from './CalendarViewProps';
import { DateChangeAction } from './DateChangeAction';

export interface CalendarView {
    /**
     *  Name of the view in different locales, if such are supported.
     */
    name: {
        [localName: string]: string;
    };

    /**
     *  Component that represents the view.
     */
    component: (calendarViewProps: CalendarViewProps) => ReactElement<CalendarViewProps>;

    /**
     *  Date range required by the view.
     *
     *  eg. MonthView requires "from" to be start of the month and "till" to be end of the month
     */
    getDateRange: (highlightDate: Date) => { from: Date; till: Date };

    /**
     *  Change the date highlighted by the calendar depending on user input.
     */
    onDateChange?: (
        dateChangeAction: DateChangeAction.BACKWARD | DateChangeAction.FORWARD,
        highlightDate: Date,
    ) => Date;
}
