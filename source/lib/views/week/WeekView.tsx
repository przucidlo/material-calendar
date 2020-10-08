import { makeStyles } from '@material-ui/core';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement, useContext, useRef } from 'react';
import ViewContextStructure, { ViewContext } from '../../common/contexts/ViewContext';
import WeekGrid from './components/weekGrid/WeekGrid';
import WeekHeader from './components/weekHeader/WeekHeader';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        maxWidth: '100vw',
        width: '100vw',
    },
}));

function WeekView(): ReactElement {
    const viewContext: ViewContextStructure = useContext(ViewContext);
    const classes = useStyles();
    let weekHeaderRef = useRef<HTMLDivElement>(null);

    const weekDays = eachDayOfInterval({
        start: startOfWeek(viewContext.highlightDate),
        end: endOfWeek(viewContext.highlightDate),
    });

    function scrollWeekHeader(event: React.UIEvent<HTMLDivElement, UIEvent>): void {
        const scrollX = event.currentTarget.scrollLeft;

        weekHeaderRef.current.scroll(scrollX, 0);
    }

    return (
        <div className={classes.root}>
            <WeekHeader weekDays={weekDays} ref={weekHeaderRef} />

            <div>
                <WeekGrid weekDays={weekDays} onScroll={scrollWeekHeader} />
            </div>
        </div>
    );
}

export default WeekView;
