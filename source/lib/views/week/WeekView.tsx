import { makeStyles } from '@material-ui/core';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import React, { ReactElement, useContext } from 'react';
import ViewContextStructure, { ViewContext } from '../../common/contexts/ViewContext';
import WeekGrid from './components/weekGrid/WeekGrid';
import WeekHeader from './components/weekHeader/WeekHeader';

const useStyles = makeStyles(() => ({
    root: {
        overflowX: 'auto',
        minWidth: 768,
    },
}));

function WeekView(): ReactElement {
    const viewContext: ViewContextStructure = useContext(ViewContext);
    const classes = useStyles();

    const weekDays = eachDayOfInterval({
        start: startOfWeek(viewContext.highlightDate),
        end: endOfWeek(viewContext.highlightDate),
    });

    return (
        <div className={classes.root}>
            <WeekHeader weekDays={weekDays} />
            <WeekGrid weekDays={weekDays} />
        </div>
    );
}

export default WeekView;
