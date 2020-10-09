import { makeStyles } from '@material-ui/core';
import React, { ReactElement, useContext } from 'react';
import { EventStorageContext, EventStorageContextStructure } from '../../../../common/contexts/EventStorageContext';
import CalendarEventUtils from '../../../../common/tools/CalendarEventUtils';
import DayGrid from '../../../day/components/dayGrid/DayGrid';

interface WeekGridProps {
    weekDays: Date[];
    
    onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
    },
    grid: {
        display: 'flex', 
        flexDirection: 'row'
    },
    gridElement: {
        flexGrow: 1, 
        minWidth: '107px'
    }
}))

export default function WeekGrid(props: WeekGridProps): ReactElement {
    const eventStorageContext: EventStorageContextStructure = useContext(EventStorageContext);
    const classes = useStyles();

    function renderGrid() {
        return props.weekDays.map((day) => {
            const events = CalendarEventUtils.getDayEvents(eventStorageContext.eventStorage, day);

            return (
                <div className={classes.gridElement} key={'dayGrid-' + day.getDate()}>
                    <DayGrid dayEvents={events ? events : []} />
                </div>
            );
        });
    }

    return (
        <div className={classes.root} onScroll={props.onScroll} style={{ height: `calc(100vh - 64px - 89px)` }} >
            <div className={classes.grid}>{renderGrid()}</div>
        </div>
    );
}
