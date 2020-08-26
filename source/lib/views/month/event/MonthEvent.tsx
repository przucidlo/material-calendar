import { Box, makeStyles, Popover, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import bindPopover from '../../../common/hooks/popover/bindPopover';
import togglePopover from '../../../common/hooks/popover/togglePopover';
import usePopover from '../../../common/hooks/popover/usePopover';
import CalendarEvent from '../../../core/components/eventStorage/CalendarEvent';
import MonthEventDot from './MonthEventDot';

export interface MonthEventProps {
    event: CalendarEvent;
}

const useStyles = makeStyles((theme) => ({
    root: {
        transition: 'background-color 0.15s linear',
        '&:hover': {
            backgroundColor: theme.palette.grey[300],
            transition: 'background-color 0.15s linear',
        },
    },
    disableTextSelection: {
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    },
}));

export default function MonthEvent(props: MonthEventProps) {
    const popoverState = usePopover();
    const classes = useStyles();

    return (
        <Box display="flex" width="100%" alignItems="center" alignContent="center" className={classes.root}>
            <MonthEventDot />
            <div
                style={{
                    flex: 1,

                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minWidth: 0,
                    whiteSpace: 'nowrap',
                    width: 0,
                }}
                {...togglePopover(popoverState)}
            >
                <Typography variant="caption" className={classes.disableTextSelection}>
                    {format(props.event.startedAt, 'HH:mm')}, {props.event.title}
                </Typography>
            </div>

            <Popover
                {...bindPopover(popoverState)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {/* <EventPopover event={props.event} popoverState={popoverState} /> */}
            </Popover>
        </Box>
    );
}