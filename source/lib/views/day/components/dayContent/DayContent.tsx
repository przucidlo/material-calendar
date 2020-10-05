import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import TimeGrid from '../../../../core/components/timeGrid/TimeGrid';
import DayGrid from '../dayGrid/DayGrid';

export interface DayContentProps {
    events: CalendarEvent[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'scroll',
        height: `calc(100vh - 64px - 89px)`,
        display: 'flex',
        position: 'relative',
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
            <TimeGrid gridElementHeight={48} width={56} />
            <div className={classes.dayGrid}>
                <DayGrid dayEvents={props.events} />
            </div>
        </div>
    );
}
