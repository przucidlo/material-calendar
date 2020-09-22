import { makeStyles, Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';

export interface DayHeaderNumberProps {
    highlightDate: Date;

    openDayViewOnClick?: boolean;

    /**
     * @default 'large'
     */
    size?: 'small' | 'large';

    onClick?: () => void;
}

const useStyles = makeStyles((theme) => ({
    common: {
        textAlign: 'center',
        borderRadius: '50%',
        color: theme.palette.text.primary,
    },
    largeVariant: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    smallVariant: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    hoverCommon: {
        backgroundColor: 'inherit',

        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    hoverToday: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),

        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    test: {
        lineHeight: 1.7,
    },
}));

export default function DayNumber(props: DayHeaderNumberProps): ReactElement {
    const classes = useStyles();
    const rootStyle = [classes.common, getRootVariant(), getBackgroundVariant()].join(' ');

    function getBackgroundVariant(): string {
        return isToday(props.highlightDate) ? classes.hoverToday : classes.hoverCommon;
    }

    function getTextVariant(): 'h6' | 'subtitle2' {
        return props.size && props.size === 'small' ? 'subtitle2' : 'h6';
    }

    function getRootVariant(): string {
        return props.size && props.size === 'small' ? classes.smallVariant : classes.largeVariant;
    }

    // TODO: Swapping Typography component with plain div might increase the performance.
    return (
        <div className={rootStyle}>
            <Typography variant={getTextVariant()} className={classes.test}>
                {props.highlightDate.getDate()}
            </Typography>
        </div>
    );
}
