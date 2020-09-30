import { Box, makeStyles, Popover, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../common/api/CalendarEvent';
import toggleEventPopover from '../../../common/hooks/eventPopover/toggleEventPopover';
import useEventPopover from '../../../common/hooks/eventPopover/useEventPopover';
import bindPopover from '../../../common/hooks/popover/bindPopover';
import usePopover from '../../../common/hooks/popover/usePopover';
import MonthEventDot from '../../month/event/MonthEventDot';

export interface ScheduleViewEventProps {
    event: CalendarEvent;
}

const useStyles = makeStyles((theme) => ({
    root: {
        transition: 'background-color 0.15s linear',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
            transition: 'background-color 0.15s linear',
        },
        borderRadius: '16px',
        marginBottom: theme.spacing(0.25),
    },
    timeSectionSpacer: {
        width: theme.spacing(1),
    },
}));

export default function ScheduleViewEvent(props: ScheduleViewEventProps) {
    const popoverState = usePopover();
    const eventPopover = useEventPopover();
    const classes = useStyles();

    function getPopoverContent(): ReactElement | null {
        if (eventPopover) {
            return React.createElement(eventPopover, { popoverState: popoverState });
        }
        return null;
    }

    return (
        <Box className={classes.root}>
            <Box
                {...toggleEventPopover(popoverState, eventPopover)}
                display="flex"
                alignItems="center"
                height="100%"
                width="100%"
            >
                {/* TIME SECTION */}
                <Box display="flex" width={160} alignItems="center" justifyContent="flex-start">
                    <div className={classes.timeSectionSpacer} />
                    <MonthEventDot size="large" />
                    <div className={classes.timeSectionSpacer} />
                    <Typography variant="body2">
                        {format(props.event.startedAt, 'HH:mm')}-{format(props.event.finishedAt, 'HH:mm')}
                    </Typography>
                </Box>
                {/* EVENT DETAILS SECTION*/}
                <Box>
                    <Typography variant="subtitle2">{props.event.title}</Typography>
                </Box>
            </Box>

            {/* POPOVER SECTION*/}
            <Popover
                {...bindPopover(popoverState)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {getPopoverContent()}
            </Popover>
        </Box>
    );
}
