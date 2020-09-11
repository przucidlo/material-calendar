import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';
import DayView from '../../../views/day/DayView';
import useViewChange from '../../hooks/viewController/useViewChange';

export interface DayHeaderNumberProps {
    highlightDate: Date;

    openDayViewOnClick?: boolean;

    /**
     * @default 'large'
     */
    size?: 'small' | 'large';
}

const useStyles = makeStyles((theme) => ({
    dayNumberCommon: {
        width: (props: any) => (props.size && props.size === 'small' ? theme.spacing(3) : theme.spacing(6)),
        height: (props: any) => (props.size && props.size === 'small' ? theme.spacing(3) : theme.spacing(6)),
        color: theme.palette.text.primary,
    },
    dayNumberPlain: {
        backgroundColor: 'inherit',

        '&:hover': {
            backgroundColor: (props: any) => (props.openDayView ? theme.palette.grey[200] : 'inherit'),
        },
    },
    dayNumberToday: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),

        '&:hover': {
            backgroundColor: (props: any) =>
                props.openDayView ? theme.palette.primary.dark : theme.palette.primary.main,
        },
    },
}));

export default function DayNumber(props: DayHeaderNumberProps): ReactElement {
    const classes = useStyles({ openDayView: props.openDayViewOnClick, size: props.size });
    const viewChange = useViewChange();

    function getDayNumberBackground(): string {
        return isToday(props.highlightDate) ? classes.dayNumberToday : classes.dayNumberPlain;
    }

    function changeViewToDayView(): void {
        if (props.openDayViewOnClick) {
            viewChange.changeView(DayView, props.highlightDate);
        }
    }

    function getTextVariant(): 'h6' | 'subtitle2' {
        return props.size && props.size === 'small' ? 'subtitle2' : 'h6';
    }

    return (
        <Avatar onClick={changeViewToDayView} className={[classes.dayNumberCommon, getDayNumberBackground()].join(' ')}>
            <Typography variant={getTextVariant()}>{props.highlightDate.getDate()}</Typography>
        </Avatar>
    );
}
