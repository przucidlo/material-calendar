import { Box, makeStyles } from '@material-ui/core';
import React, { ReactNode, useContext } from 'react';
import { CalendarContext, CalendarContextStructure } from '../../../common/contexts/CalendarContext';
import ViewContextStructure, { ViewContext } from '../../../common/contexts/ViewContext';
import ScheduleGridElement from './ScheduleGridElement';

export interface ScheduleGridProps {}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: 'calc(100vh - 64px)',
    },
}));

export default function ScheduleGrid(props: ScheduleGridProps) {
    const calendarContext: CalendarContextStructure = useContext(CalendarContext);
    const viewContext: ViewContextStructure = useContext(ViewContext);
    const classes = useStyles();

    function displayScheduleElements(): ReactNode[] {
        const date = viewContext.highlightDate;
        const monthEvents = calendarContext.eventStorage?.[date.getFullYear()]?.[date.getMonth()];
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
