import React, { ReactElement, useContext } from 'react';
import { CalendarContext } from '../../common/contexts/CalendarContext';
import { ViewContext } from '../../common/contexts/ViewContext';
import MonthGrid from './grid/MonthGrid';

interface MonthViewProps {}

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
