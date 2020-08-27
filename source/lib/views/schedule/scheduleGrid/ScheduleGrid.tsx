import { Box, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import CalendarState from '../../../core/components/calendarState/CalendarState';
import ScheduleGridElement from './ScheduleGridElement';

export interface ScheduleGridProps {
    calendarState: CalendarState;
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: 'calc(100vh - 64px)',
    },
}));

export default function ScheduleGrid(props: ScheduleGridProps) {
    const calendarState = props.calendarState;
    const classes = useStyles();

    function displayScheduleElements(): ReactNode[] {
        const date = calendarState.getHighlightDate();
        const monthEvents = calendarState.getEventStorage()?.[date.getFullYear()]?.[date.getMonth()];
        let elements: ReactNode[] = [];

        if (monthEvents) {
            for (let dayEvents of Object.entries(monthEvents)) {
                elements.push(
                    <ScheduleGridElement
                        day={dayEvents[0]}
                        date={date}
                        calendarEvents={dayEvents[1]}
                        key={dayEvents[0]}
                    />,
                );
            }
        }

        return elements;
    }

    return (
        <Box display="flex" flexDirection="column" className={classes.root}>
            {displayScheduleElements()}
        </Box>
    );
}
