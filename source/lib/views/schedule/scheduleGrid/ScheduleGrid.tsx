import { Box, makeStyles } from '@material-ui/core';
import React, { ReactNode, useContext } from 'react';
import { EventStorageContext, EventStorageContextStructure } from '../../../common/contexts/EventStorageContext';
import ViewContextStructure, { ViewContext } from '../../../common/contexts/ViewContext';
import ScheduleGridElement from './ScheduleGridElement';

export interface ScheduleGridProps {}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        maxHeight: 'calc(100vh - 64px)',
        maxWidth: '100vw',
        overflowY: 'auto',
    },
}));

export default function ScheduleGrid(props: ScheduleGridProps) {
    const eventStorageContext: EventStorageContextStructure = useContext(EventStorageContext);
    const viewContext: ViewContextStructure = useContext(ViewContext);
    const classes = useStyles();

    function displayScheduleElements(): ReactNode[] {
        const date = viewContext.highlightDate;
        //TODO: Move this to helper function.
        const monthEvents = eventStorageContext.eventStorage?.[date.getFullYear()]?.[date.getMonth()];
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
