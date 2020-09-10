import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import DayHeader from '../../../day/components/dayHeader/DayHeader';

export interface WeekHeaderProps {
    weekDays: Date[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 16,
    },
    weekHeaderElement: {
        flexGrow: 1,
        flexBasis: 0,
    },
    timeGridSpacer: {
        width: 56,
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
    },
}));

export default function WeekHeader(props: WeekHeaderProps): ReactElement {
    const classes = useStyles();

    function createDayHeaders() {
        return props.weekDays.map((day, index) => {
            return (
                <div key={index} className={classes.weekHeaderElement}>
                    <DayHeader center openChildView highlightDate={day} />
                </div>
            );
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.timeGridSpacer} />

            {[...createDayHeaders()]}
        </div>
    );
}
