import { makeStyles } from '@material-ui/core';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ViewContextStructure, { ViewContext } from '../../common/contexts/ViewContext';
import WeekTimeGrid from './components/timeGrid/WeekTimeGrid';
import WeekGrid from './components/weekGrid/WeekGrid';
import WeekHeader from './components/weekHeader/WeekHeader';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
}));

function WeekView(): ReactElement {
    const viewContext: ViewContextStructure = useContext(ViewContext);
    const classes = useStyles();

    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [weekDays, setWeekDays] = useState<Date[]>(getWeekDays());

    let headerRef = useRef<HTMLDivElement>(null);
    let timeGridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (headerRef.current) {
            const height: number = headerRef.current.getBoundingClientRect().height;

            setHeaderHeight(Math.round(height));
        }
    }, []);

    useEffect(() => {
        setWeekDays(getWeekDays());
    }, [viewContext.highlightDate]);

    function getWeekDays(): Date[] {
        return eachDayOfInterval({
            start: startOfWeek(viewContext.highlightDate),
            end: endOfWeek(viewContext.highlightDate),
        });
    }

    function handleOnScrollEvent(event: React.UIEvent<HTMLDivElement, UIEvent>): void {
        scrollWeekHeader(event);
        scrollTimeGrid(event);
    }

    function scrollWeekHeader(event: React.UIEvent<HTMLDivElement, UIEvent>): void {
        if (headerRef.current) {
            const scrollX = event.currentTarget.scrollLeft;

            headerRef.current.scroll(scrollX, 0);
        }
    }

    function scrollTimeGrid(event: React.UIEvent<HTMLDivElement, UIEvent>): void {
        if (timeGridRef.current) {
            const scrollY = event.currentTarget.scrollTop;

            timeGridRef.current.scroll(0, scrollY);
        }
    }

    return (
        <div className={classes.root}>
            <WeekTimeGrid headerHeight={headerHeight} ref={timeGridRef} />

            <div style={{ width: 'calc(100% - 56px)' }}>
                <WeekHeader weekDays={weekDays} ref={headerRef} />
                <WeekGrid weekDays={weekDays} weekHeaderHeight={headerHeight} onScroll={handleOnScrollEvent} />
            </div>
        </div>
    );
}

export default WeekView;
