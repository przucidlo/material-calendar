import { Grid } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import DayEventGrid from '../dayEvent/DayEventGrid';
import HourIndicator from '../hourIndicator/HourIndicator';
import Day from './Day';

interface DayGridProps {
    date: Date;

    dayEvents: CalendarEvent[];
}

function DayGrid(props: DayGridProps): ReactElement {
    function renderGridElements(): ReactElement[] {
        let elements: ReactElement[] = [];

        for (let i = 0; i < 24; i++) {
            elements.push(
                <Grid item key={i}>
                    <Day {...props} hideBorder={i === 0} hour={i} />
                </Grid>,
            );
        }

        return elements;
    }

    function renderHourIndicator(): ReactElement<typeof HourIndicator> | null {
        if(isToday(props.date)){
            return <HourIndicator cellHeight={48}/>;
        }
        return null;
    }

    return (
        <div style={{ position: 'relative' }}>
            <Grid container direction="column">
                {renderGridElements()}
            </Grid>

            <DayEventGrid calendarEvents={props.dayEvents} />
            
            {renderHourIndicator()}
        </div>
    );
}

export default DayGrid;
