import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../core/components/eventStorage/CalendarEvent';
import Day from './Day';
import DayAppointmentGrid from './DayAppointmentGrid';

interface DayGridProps {
    dayEvents: CalendarEvent[];
}

function DayGrid(props: DayGridProps): ReactElement {
    function renderGridElements(): ReactElement[] {
        let elements: ReactElement[] = [];

        for (let i = 0; i < 24; i++) {
            elements.push(
                <Grid item key={i}>
                    <Day {...props} hideBorder={i === 0 ? true : false} hour={i} />
                </Grid>,
            );
        }

        return elements;
    }

    return (
        <div style={{ position: 'relative' }}>
            <Grid container direction="column">
                {renderGridElements()}
            </Grid>
            <DayAppointmentGrid dayEvents={props.dayEvents} />
        </div>
    );
}

export default DayGrid;
