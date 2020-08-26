import { Box, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { EventStorage } from '../../../core/components/eventStorage/CalendarEventStorage';
import ScheduleGridElement from './ScheduleGridElement';

export interface ScheduleGridProps {
    eventStorage: EventStorage;
    focusedDate: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: 'calc(100vh - 64px)',
    },
}));

export default function ScheduleGrid(props: ScheduleGridProps) {
    const classes = useStyles();

    function displayScheduleElements(): ReactNode[] {
        const date = props.focusedDate;
        const monthEvents = props.eventStorage?.[date.getFullYear()]?.[date.getMonth()];
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
