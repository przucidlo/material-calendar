import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';
import useLocale from '../../../../common/hooks/locale/useLocale';

export interface DayHeaderContentProps {
    highlightDate: Date;
}

const useStyle = makeStyles((theme) => ({
    root: {
        width: 96,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dayNumberCommon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        color: theme.palette.text.primary,
    },
    dayNumberPlain: {
        backgroundColor: 'inherit',
    },
    dayNumberToday: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
}));

export default function DayHeaderContent(props: DayHeaderContentProps): ReactElement {
    const classes = useStyle();
    const locale = useLocale();

    function getDayLabel(): ReactElement {
        const labelColor = getDayLabelColor();

        return (
            <Typography color={labelColor} variant="body1">
                {locale.daysShort[props.highlightDate.getDay()].toLocaleUpperCase()}
            </Typography>
        );
    }

    function getDayLabelColor(): 'primary' | 'textSecondary' {
        return isToday(props.highlightDate) ? 'primary' : 'textSecondary';
    }

    function getDayNumber(): ReactElement {
        return (
            <Avatar className={[classes.dayNumberCommon, getDayNumberBackground()].join(' ')}>
                {props.highlightDate.getDate()}
            </Avatar>
        );
    }

    function getDayNumberBackground(): string {
        return isToday(props.highlightDate) ? classes.dayNumberToday : classes.dayNumberPlain;
    }

    return (
        <div className={classes.root}>
            {getDayLabel()}
            {getDayNumber()}
        </div>
    );
}
