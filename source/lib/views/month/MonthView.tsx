import React, { ReactElement } from 'react';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import MonthGrid from './grid/MonthGrid';

interface MonthViewProps extends CalendarViewProps {}

function MonthView(props: MonthViewProps): ReactElement {
    return (
        <div>
            <MonthGrid
                date={props.calendarState.getHighlightDate()}
                eventStorage={props.calendarState.getEventStorage()}
            />
        </div>
    );
}

export default MonthView;
