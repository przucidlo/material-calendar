import { makeStyles } from '@material-ui/core';
import { areIntervalsOverlapping } from 'date-fns';
import React, { ReactElement, useMemo, useState } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import EventPopover from '../../../../common/components/eventPopover/EventPopover';
import usePopover from '../../../../common/hooks/popover/usePopover';
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

/**
 * Grid that displays all provided calendarEvents over DayGrid.
 * To make grid more readable events are "chained" together to share available space.
 */
export default function DayEventGrid(props: DayEventGridProps): ReactElement {
    // Keeps track on which CalendarEvent
    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent>();
    // State of the popover used to display details about focused event.
    const popoverState = usePopover();

    const classes = useStyles();

    function renderGrid(): ReactElement[] {
        let elements: ReactElement[] = [];

        /*
         *  By creating an object we allocate memory that can be shared between multiple components.
         *  Which allows them to adjust their position in a chain.
         */
        let chainCount = {
            count: 1,
        };

        for (let i = 0; i < props.calendarEvents.length; i++) {
            const previousElement: CalendarEvent | undefined = props.calendarEvents[i - 1];
            const currentElement = props.calendarEvents[i];

            // If events are overlapping we increase the count property inside of chainCount object.
            // Otherwise we "reset" the object.
            if (areElementsOverlapping(previousElement, currentElement)) {
                chainCount.count += 1;
            } else {
                chainCount = { count: 1 };
            }

            elements.push(
                <div key={currentElement.id}>
                    <DayEvent
                        onClick={handleDayEventSelection}
                        calendarEvent={currentElement}
                        cellHeight={cellHeight}
                        chainCount={chainCount}
                        // Allocating memory for the count property, since it will
                        // become "undefined" once the loop finishes it's work.
                        orderInChain={Object.assign({}, chainCount).count}
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

    function handleDayEventSelection(mouseEvent: React.MouseEvent<any, any>, calendarEvent: CalendarEvent): void {
        setCalendarEvent(calendarEvent);
        popoverState.openPopover(mouseEvent);
    }

    return (
        <div className={classes.root}>
            <EventPopover popoverState={popoverState} calendarEvent={calendarEvent} />
            {useMemo(() => renderGrid(), [props.calendarEvents])}
        </div>
    );
}
