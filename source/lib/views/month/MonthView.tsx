import React, { ReactElement, useContext } from 'react';
import { EventStorageContext } from '../../common/contexts/EventStorageContext';
import { ViewContext } from '../../common/contexts/ViewContext';
import MonthGrid from './grid/MonthGrid';

interface MonthViewProps {}

function MonthView(props: MonthViewProps): ReactElement {
    const eventStorageContext = useContext(EventStorageContext);
    const viewContext = useContext(ViewContext);

    return (
        <div>
            <MonthGrid date={viewContext.highlightDate} eventStorage={eventStorageContext.eventStorage} />
        </div>
    );
}

export default MonthView;
