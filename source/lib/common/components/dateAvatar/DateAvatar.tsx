import { makeStyles, Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';

export interface DayHeaderNumberProps {
    date: Date;

    highlightOnHover?: boolean;

    grayOutText?: boolean;

    /**
     * @default 'large'
     */
    size?: 'small' | 'large';
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
    backgroundCommon: {
        backgroundColor: 'inherit',
    },
    backgroundToday: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
    },
    hoverCommon: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    hoverToday: {
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    textSmall: {
        lineHeight: 1.7,
    },
    textLarge: {
        lineHeight: 2.4,
    },
    textColorGrey: {
        color: theme.palette.grey[500],
    },
}));

/**
 * Component based on Avatar design of Material-UI.
 *
 * Created due default Avatar component being too heavy to render in YearView,
 * which degraded the performance significantly.
 *
 * @privateRemarks
 * Remember to keep this component as lightweight as you can.
 */
export default function DateAvatar(props: DayHeaderNumberProps): ReactElement {
    const classes = useStyles();
    const rootClasses: string = [classes.common, getRootVariant(), getBackgroundVariant(), getHoverVariant()].join(' ');
    const textClasses: string = [getTextSize(), getTextColor()].join(' ');

    function getBackgroundVariant(): string {
        return isToday(props.date) ? classes.backgroundToday : classes.backgroundCommon;
    }

    function getTextVariant(): 'h6' | 'subtitle2' {
        return props.size && props.size === 'small' ? 'subtitle2' : 'h6';
    }

    function getTextSize(): string {
        return props.size && props.size === 'small' ? classes.textSmall : classes.textLarge;
    }

    function getTextColor(): string {
        if (props.grayOutText) {
            return classes.textColorGrey;
        }
        return '';
    }

    function getRootVariant(): string {
        return props.size && props.size === 'small' ? classes.smallVariant : classes.largeVariant;
    }

    function getHoverVariant(): string {
        if (props.highlightOnHover) {
            return isToday(props.date) ? classes.hoverToday : classes.hoverCommon;
        }

        return '';
    }

    // TODO: Swapping Typography component with plain div might increase the performance.
    return (
        <div className={rootClasses}>
            <Typography variant={getTextVariant()} className={textClasses}>
                {props.date.getDate()}
            </Typography>
        </div>
    );
}
