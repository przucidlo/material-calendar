import { makeStyles, Paper, Popover } from '@material-ui/core';
import { differenceInMinutes, format } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import toggleEventPopover from '../../../../common/hooks/eventPopover/toggleEventPopover';
import useEventPopover from '../../../../common/hooks/eventPopover/useEventPopover';
import bindPopover from '../../../../common/hooks/popover/bindPopover';
import usePopover from '../../../../common/hooks/popover/usePopover';

export interface DayEvent {
    calendarEvent: CalendarEvent;
    cellHeight: number;

    orderInChain: number;
    chainCount: { count: number };
}

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        position: 'absolute',
    },
    paper: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
}));

export default function DayEvent(props: DayEvent) {
    const eventPopover = useEventPopover();
    const popoverState = usePopover();
    const classes = useStyles();

    function getPopoverContent(): ReactElement | null {
        if (eventPopover) {
            return React.createElement(eventPopover, {
                popoverState: popoverState,
                calendarEvent: props.calendarEvent,
            });
        }
        return null;
    }

    /**
     * Divides length of the event into the sections
     * and multiplies it by size of the cell.
     */
    function getHeight(): number {
        const durationInMinutes = differenceInMinutes(props.calendarEvent.finishedAt, props.calendarEvent.startedAt);
        const numberOfSections = Math.round(durationInMinutes / 15);

        return numberOfSections * (props.cellHeight / 4);
    }

    /**
     * Calculates remaining width of the element by
     * subtracking positionInChain from 100%.
     */
    function getWidth(): string {
        return String(100 - getPositionInChain() + '%');
    }

    /**
     * Calculates X position of the element based on
     * size of the chainCount and orderInChain of the element.
     */
    function getPositionLeft(): string {
        return String(getPositionInChain() + '%');
    }

    /**
     * Calculates which part of the chain belongs
     * to this element.
     */
    function getPositionInChain(): number {
        return (100 / props.chainCount.count) * (props.orderInChain - 1);
    }

    /**
     * Calculates Y position of the element based on
     * when the event startedAt property.
     */
    function getPositionTop(): number {
        const startedAt = props.calendarEvent.startedAt;

        // (hours + (minutes/hour)) * cellHeight.
        return (startedAt.getHours() + roundMinutes(startedAt) / 60) * props.cellHeight;
    }

    /**
     * Rounds minutes to provided values to make
     * display of the grid "snappy".
     */
    function roundMinutes(startedAt: Date): number {
        const startedAtMinutes = startedAt.getMinutes();
        const points: number[] = [45, 30, 15, 0];

        for (let point of points) {
            if (startedAtMinutes >= point) {
                return point;
            }
        }

        return 0;
    }

    return (
        <div
            style={{
                width: getWidth(),
                height: getHeight(),
                top: getPositionTop(),
                left: getPositionLeft(),
            }}
            className={classes.root}
        >
            <Paper
                variant="outlined"
                style={{
                    minHeight: getHeight(),
                }}
                elevation={0}
                className={classes.paper}
                {...toggleEventPopover(popoverState, eventPopover)}
            >
                {props.calendarEvent.title}, {format(props.calendarEvent.startedAt, 'HH:mm')} -{' '}
                {format(props.calendarEvent.finishedAt, 'HH:mm')}
            </Paper>
            <Popover
                {...bindPopover(popoverState)}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                {getPopoverContent()}
            </Popover>
        </div>
    );
}
