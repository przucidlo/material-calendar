import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import TimeGrid from '../../../../common/components/timeGrid/TimeGrid';
import TimeGridLines from '../../../../common/components/timeGrid/TimeGridLines';
import DayGrid from '../dayGrid/DayGrid';

export interface DayContentProps {
    highlightDate: Date;

    events: CalendarEvent[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'scroll',
        height: `calc(100vh - 64px - 89px)`,
        display: 'flex',
        position: 'relative',
    },
    timeGrid: {
        display: 'flex',
    },
    dayGrid: {
        height: '100%',
        flexGrow: 1,
    },
}));

export default function DayContent(props: DayContentProps): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.timeGrid}>
                <TimeGrid cellHeight={48} width={48} />
                <TimeGridLines cellHeight={48} />
            </div>
            <div className={classes.dayGrid}>
                <DayGrid dayEvents={props.events} date={props.highlightDate} />
            </div>
        </div>
    );
}
