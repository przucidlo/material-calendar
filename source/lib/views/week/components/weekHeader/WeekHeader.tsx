import { makeStyles } from '@material-ui/core';
import React from 'react';
import DayHeader from '../../../day/components/dayHeader/DayHeader';

export interface WeekHeaderProps {
    weekDays: Date[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflowX: 'hidden',
    },
    weekHeaderElement: {
        flexGrow: 1,
        flexBasis: '107px',
        minWidth: '107.5px',
    },
    scrollbarSpacer: {
        width: 16,
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
    },
}));

const WeekHeader = React.forwardRef<HTMLDivElement, WeekHeaderProps>((props: WeekHeaderProps, ref) => {
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
        <div className={classes.root} ref={ref}>
            {[...createDayHeaders()]}
            <div className={classes.scrollbarSpacer} />
        </div>
    );
});

export default WeekHeader;
