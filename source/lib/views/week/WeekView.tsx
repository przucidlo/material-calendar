import { makeStyles } from '@material-ui/core';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement, useContext, useLayoutEffect, useRef, useState } from 'react';
import ViewContextStructure, { ViewContext } from '../../common/contexts/ViewContext';
import WeekGrid from './components/weekGrid/WeekGrid';
import WeekHeader from './components/weekHeader/WeekHeader';

const useStyles = makeStyles(() => ({
    root: {
    },
}));

function WeekView(): ReactElement {
    const viewContext: ViewContextStructure = useContext(ViewContext);
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const weekDays = getWeekDays();
    const classes = useStyles();

    let weekHeaderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(weekHeaderRef.current){
            const height: number = weekHeaderRef.current.getBoundingClientRect().height;


            // Adding one extra pixel due to clientHeight 
            setHeaderHeight(Math.round(height));
        }
    }, [])

    function scrollWeekHeader(event: React.UIEvent<HTMLDivElement, UIEvent>): void {
        if (weekHeaderRef) {
            const scrollX = event.currentTarget.scrollLeft;

            weekHeaderRef.current.scroll(scrollX, 0);
        }
    }

    function getWeekDays(): Date[] {
        return eachDayOfInterval({
            start: startOfWeek(viewContext.highlightDate),
            end: endOfWeek(viewContext.highlightDate),
        });
    }

    return (
        <div className={classes.root}>
            <WeekHeader weekDays={weekDays} ref={weekHeaderRef} />
            <WeekGrid weekDays={weekDays} weekHeaderHeight={headerHeight} onScroll={scrollWeekHeader}/>
        </div>
    );
}

export default WeekView;
