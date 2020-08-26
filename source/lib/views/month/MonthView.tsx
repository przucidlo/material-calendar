import React, { ReactElement } from 'react';
import { EventStorage } from '../../core/components/eventStorage/CalendarEventStorage';
import MonthGrid from './grid/MonthGrid';

interface Props {
    focusedDate: Date;
    eventStorage: EventStorage;
}

function MonthView(props: Props): ReactElement {
    return (
        <div>
            <MonthGrid date={props.focusedDate} eventStorage={props.eventStorage} />
        </div>
    );
}

export default MonthView;
