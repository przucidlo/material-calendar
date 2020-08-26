import { makeStyles, Popover, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import bindPopover from '../../../common/hooks/popover/bindPopover';
import togglePopover from '../../../common/hooks/popover/togglePopover';
import usePopover from '../../../common/hooks/popover/usePopover';
import MonthEventList from './MonthEventList';

export interface MonthEventListPopoverProps {
    date: Date;
    remainingEvents: number;
    eventsComponent: ReactNode[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 2,
        paddingRight: 2,

        transition: 'background-color 0.15s linear',
        '&:hover': {
            backgroundColor: theme.palette.grey[300],
            transition: 'background-color 0.15s linear',
        },
    },
}));

export default function MonthEventListPopover(props: MonthEventListPopoverProps) {
    const classes = useStyles();
    const popoverState = usePopover();

    return (
        <div className={classes.root}>
            <div {...togglePopover(popoverState)} style={{ width: '100%' }}>
                <Typography variant="caption">
                    <b>Jeszcze {props.remainingEvents}</b>
                </Typography>
            </div>

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
                <MonthEventList date={props.date} eventsComponent={props.eventsComponent} />
            </Popover>
        </div>
    );
}
