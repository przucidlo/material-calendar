import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../api/CalendarEvent';
import useLocale from '../../hooks/locale/useLocale';
import { PopoverState } from '../../hooks/popover/usePopover';
import DateEventsCloseButton from '../dateEvents/DateEventsCloseButton';

interface Props {
    popoverState: PopoverState;
    calendarEvent: CalendarEvent;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        width: 320,
    },
    square: {
        width: 16,
        height: 16,
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function ExamplePopover(props: Props): ReactElement {
    const classes = useStyles();
    const locale = useLocale();

    function handleOnClose(): void {
        props.popoverState.closePopover();
    }

    return (
        <div className={classes.root}>
            <DateEventsCloseButton onClose={handleOnClose} />

            <Box display="flex" marginTop={'24px'}>
                <Box display="flex" justifyContent="center" alignItems="center" px={2}>
                    <Avatar variant="rounded" className={classes.square}>
                        {' '}
                    </Avatar>
                </Box>
                <Box pl={'8px'} pb={1}>
                    <Typography variant="h5">{props.calendarEvent.title}</Typography>
                    <Typography variant="caption" gutterBottom>
                        {locale.days[props.calendarEvent.startedAt.getDay()]}, {props.calendarEvent.startedAt.getDate()}{' '}
                        {locale.months[props.calendarEvent.startedAt.getMonth()].toLocaleLowerCase()}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
