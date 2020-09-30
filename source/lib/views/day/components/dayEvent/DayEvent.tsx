import { Box, Paper, Popover, useTheme } from '@material-ui/core';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';
import toggleEventPopover from '../../../../common/hooks/eventPopover/toggleEventPopover';
import useEventPopover from '../../../../common/hooks/eventPopover/useEventPopover';
import bindPopover from '../../../../common/hooks/popover/bindPopover';
import usePopover from '../../../../common/hooks/popover/usePopover';

export interface DayEvent {
    height: number;
    positionTop: number;
    calendarEvent: CalendarEvent;
}

export default function DayEvent(props: DayEvent) {
    const theme = useTheme();
    const eventPopover = useEventPopover();
    const popoverState = usePopover();

    function getPopoverContent(): ReactElement | null {
        if (eventPopover) {
            return React.createElement(eventPopover, {
                popoverState: popoverState,
                calendarEvent: props.calendarEvent,
            });
        }
        return null;
    }

    return (
        <div
            style={{
                width: '100%',
                height: props.height,
                color: 'white',
                top: props.positionTop,
                position: 'absolute',
            }}
        >
            <Box pr={0}>
                <Paper
                    variant="outlined"
                    style={{
                        minHeight: props.height,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                    }}
                    elevation={0}
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
            </Box>
        </div>
    );
}
