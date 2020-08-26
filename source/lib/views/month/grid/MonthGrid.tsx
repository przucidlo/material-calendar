import { addDays, eachDayOfInterval, endOfMonth, startOfMonth, subDays } from 'date-fns';
import React, { ReactElement } from 'react';
import { EventStorage } from '../../../core/components/eventStorage/CalendarEventStorage';
import CalendarEventUtils from '../../../core/components/eventStorage/CalendarEventUtils';
import MonthGridElement from './MonthGridElement';

interface MonthGridProps {
    date: Date;
    eventStorage: EventStorage;
}

function MonthGrid(props: MonthGridProps): ReactElement {
    const monthStart = startOfMonth(props.date);
    const monthEnd = endOfMonth(props.date);
    let monthDays = [...eachDayOfInterval({ start: monthStart, end: monthEnd })];

    function renderGrid(): ReactElement[] {
        //Each grid row(week) is stored in that array.
        let gridRow: ReactElement[][] = [];
        //Every day is stored here before pushing it to gridRow,
        //array is set to empty after pushing a row into gridRow array
        let gridColumns: ReactElement[] = [];

        fillOutMissingDaysOfMonth();

        monthDays.forEach((day, index) => {
            gridColumns.push(
                <div key={index} style={{ display: 'flex', flex: 1 }}>
                    <MonthGridElement
                        date={day}
                        key={day.toLocaleString()}
                        displayDayOfWeekIndication={index < 7}
                        indicatePreviousMonth={day.getMonth() !== props.date.getMonth()}
                        dayEvents={CalendarEventUtils.getDayEvents(props.eventStorage, day)}
                    />
                </div>,
            );

            //If (index + 1) is divided by 7 we push a gridColumns into gridRow.
            if ((index + 1) % 7 === 0) {
                gridRow.push(gridColumns);

                //Emptying the array to insert days from next week into it.
                gridColumns = [];
            }
        });

        return gridRow.map((grid, index) => {
            return (
                <div key={'grid-' + index} style={{ flexDirection: 'row', display: 'flex', flexGrow: 1, flexBasis: 0 }}>
                    {grid}
                </div>
            );
        });
    }

    /**
     * Since we display 35 days in our calendar we have to
     * fill out missing days with days from previous and next month.
     */
    function fillOutMissingDaysOfMonth() {
        if (monthStart.getDay() !== 0) {
            insertDaysFromPreviousMonth();
        }

        if (monthEnd.getDay() !== 6) {
            insertDaysFromNextMonth();
        }
    }

    function insertDaysFromPreviousMonth() {
        const daysBeforeStartDate = subDays(monthStart, monthStart.getDay());

        monthDays = [...eachDayOfInterval({ start: daysBeforeStartDate, end: subDays(monthStart, 1) }), ...monthDays];
    }

    function insertDaysFromNextMonth() {
        const missingDays = 6 - monthEnd.getDay();
        const daysAferEndDate = addDays(monthEnd, missingDays);

        monthDays = [...monthDays, ...eachDayOfInterval({ start: addDays(monthEnd, 1), end: daysAferEndDate })];
    }

    return (
        <div style={{ height: 'calc(100vh - 64px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>{renderGrid()}</div>
        </div>
    );
}

export default MonthGrid;
