import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement, useContext } from 'react';
import ViewContextStructure, { ViewContext } from '../../common/contexts/ViewContext';
import WeekGrid from './components/weekGrid/WeekGrid';
import WeekHeader from './components/weekHeader/WeekHeader';

interface WeekViewProps {}

function WeekView(props: WeekViewProps): ReactElement {
    const viewContext: ViewContextStructure = useContext(ViewContext);

    const weekDays = eachDayOfInterval({
        start: startOfWeek(viewContext.highlightDate),
        end: endOfWeek(viewContext.highlightDate),
    });

    return (
        <div>
            <WeekHeader weekDays={weekDays} />
            <WeekGrid weekDays={weekDays} />
        </div>
    );
}

export default WeekView;
