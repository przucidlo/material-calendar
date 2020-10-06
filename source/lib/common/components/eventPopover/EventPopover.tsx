import { Popover } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import CalendarEvent from '../../api/CalendarEvent';
import useEventPopover from '../../hooks/eventPopover/useEventPopover';
import bindPopover from '../../hooks/popover/bindPopover';
import { PopoverState } from '../../hooks/popover/usePopover';

export interface EventPopoverProps {
    popoverState: PopoverState;
    calendarEvent: CalendarEvent;
}

export default function EventPopover(props: EventPopoverProps): ReactElement {
    const eventPopover = useEventPopover();

    /*
     *  Prevent opening of popover if eventPopover is missing.
     */
    useEffect(() => {
        if (!eventPopover) {
            props.popoverState.closePopover();
        }
    }, [props.popoverState.isOpen]);

    function getPopoverContent(): ReactElement | null {
        if (eventPopover) {
            return React.createElement(eventPopover, {
                popoverState: props.popoverState,
                calendarEvent: props.calendarEvent,
            });
        }
        return null;
    }

    return (
        <Popover
            {...bindPopover(props.popoverState)}
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
    );
}
