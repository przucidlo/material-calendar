import { makeStyles } from '@material-ui/core';
import React, { ReactElement, useContext, useMemo } from 'react';
import { EventStorageContext, EventStorageContextStructure } from '../../../../common/contexts/EventStorageContext';
import CalendarEventUtils from '../../../../common/tools/CalendarEventUtils';
import { NAVIGATION_BAR_HEIGHT } from '../../../../core/components/navigationBar/NavigationBar';
import DayGrid from '../../../day/components/dayGrid/DayGrid';

interface WeekGridProps {
    weekDays: Date[];
    weekHeaderHeight: number;

    onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
    },
    gridElement: {
        flexGrow: 1,
        minWidth: '107px',
    },
}));

export default function WeekGrid(props: WeekGridProps): ReactElement {
    const eventStorageContext: EventStorageContextStructure = useContext(EventStorageContext);
    const classes = useStyles();

    function renderGrid() {
        return props.weekDays.map((day) => {
            const events = CalendarEventUtils.getDayEvents(eventStorageContext.eventStorage, day);

            return (
                <div className={classes.gridElement} key={'dayGrid-' + day.getDate()}>
                    <DayGrid dayEvents={events ? events : []} date={day} />
                </div>
            );
        });
    }

    function getHeight(): string {
        return `calc(100vh - ${NAVIGATION_BAR_HEIGHT}px - ${props.weekHeaderHeight}px)`;
    }

    return (
        <div className={classes.root} onScroll={props.onScroll} style={{ height: getHeight() }}>
            <div className={classes.grid}>{useMemo(() => renderGrid(), [eventStorageContext.eventStorage])}</div>
        </div>
    );
}
