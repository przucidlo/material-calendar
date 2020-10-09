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
        if(weekHeaderRef){
            const scrollX = event.currentTarget.scrollLeft;

            weekHeaderRef.current.scroll(scrollX, 0);
        }
    }

    function getWeekHeaderHeight(): number {
        if(weekHeaderRef.current){  
            const height = weekHeaderRef.current.clientHeight;

            if(height){
                return height;
            }
        }

        return 0;
    }

    return (
        <div className={classes.root}>
            <WeekHeader weekDays={weekDays} ref={weekHeaderRef} />
            <WeekGrid weekDays={weekDays} weekHeaderHeight={getWeekHeaderHeight()} onScroll={scrollWeekHeader} />
        </div>
    );
}

export default WeekView;
