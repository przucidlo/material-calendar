import { Box, Paper, Popover, useTheme } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import CalendarEvent from '../../common/api/CalendarEvent';
import bindPopover from '../../common/hooks/popover/bindPopover';
import togglePopover from '../../common/hooks/popover/togglePopover';
import usePopover from '../../common/hooks/popover/usePopover';

export interface DayAppointmentProps {
    height: number;
    positionTop: number;
    calendarEvent: CalendarEvent;
}

export default function DayAppointment(props: DayAppointmentProps) {
    const theme = useTheme();
    const popoverState = usePopover();

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
                    {...togglePopover(popoverState)}
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
                        vertical: 'left',
                        horizontal: 'center',
                    }}
                >
                    {/* <EventPopover event={props.calendarEvent} popoverState={popoverState} /> */}
                </Popover>
            </Box>
        </div>
    );
}
