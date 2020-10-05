import { makeStyles } from '@material-ui/core';
import { areIntervalsOverlapping } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import DayEvent from './DayEvent';

export interface DayEventGridProps {
    /**
     * Sorted array of calendarEvents from oldest to newest event.
     */
    calendarEvents: CalendarEvent[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
}));

/*
 * Every cell in the grid must have the same height,
 * otherwise grid won't be displayed correctly.
 */
const cellHeight = 48;

export default function DayEventGrid(props: DayEventGridProps): ReactElement {
    const classes = useStyles();

    /*
     *  Render methods.
     */

    function renderGrid(): ReactElement[] {
        let elements: ReactElement[] = [];

        let chainCount = {
            count: 1,
        };

        for (let i = 0; i < props.calendarEvents.length; i++) {
            const previousElement: CalendarEvent | undefined = props.calendarEvents[i - 1];
            const currentElement = props.calendarEvents[i];

            if (areElementsOverlapping(previousElement, currentElement)) {
                chainCount.count += 1;
            } else {
                chainCount = { count: 1 };
            }

            elements.push(
                <div key={currentElement.id}>
                    <DayEvent
                        calendarEvent={currentElement}
                        cellHeight={cellHeight}
                        orderInChain={Object.assign({}, chainCount).count}
                        chainCount={chainCount}
                    />
                </div>,
            );
        }

        return elements;
    }

    function areElementsOverlapping(previousElement: CalendarEvent, currentElement: CalendarEvent): boolean {
        if (previousElement) {
            return areIntervalsOverlapping(
                { start: previousElement.startedAt, end: previousElement.finishedAt },
                { start: currentElement.startedAt, end: currentElement.finishedAt },
            );
        }
        return false;
    }

    return (
        <div className={classes.root}>
            <div style={{}}>{renderGrid()}</div>
        </div>
    );
}
