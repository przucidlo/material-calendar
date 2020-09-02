import React, { ReactElement, useContext } from 'react';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import { CalendarContext } from '../../common/contexts/CalendarContext';
import { ViewContext } from '../../common/contexts/ViewContext';
import MonthGrid from './grid/MonthGrid';

interface MonthViewProps extends CalendarViewProps {}

function MonthView(props: MonthViewProps): ReactElement {
    const calendarContext = useContext(CalendarContext);
    const viewContext = useContext(ViewContext);

    return (
        <div>
            <MonthGrid date={viewContext.highlightDate} eventStorage={calendarContext.eventStorage} />
        </div>
    );
}

export default MonthView;
