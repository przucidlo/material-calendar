import React, { ReactElement, Fragment } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import DayNumber from '../../../dayNumber/DayNumber';
import DateUtils from '../../../../tools/DateUtils';
import { isSameMonth } from 'date-fns';

export interface CompactMonthGridProps {
    /**
     * Date set to any day inside of a month.
     */
    month: Date;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, auto)',
        gridRowGap: '4px',
    },
}));

export default function CompactMonthGrid(props: CompactMonthGridProps): ReactElement {
    const classes = useStyles();

    function createGrid(): ReactElement {
        const gridDays = DateUtils.getWeeksDaysOfMonth(props.month);
        let columns: ReactElement[] = [];

        gridDays.forEach((day) => {
            columns.push(createGridElement(day));
        });

        return (
            <div className={classes.container} key={['compact-grid-container'].join('-')}>
                {columns}
            </div>
        );
    }

    function createGridElement(day: Date): ReactElement {
        return (
            <Fragment key={['compact-grid-element', day.getMonth(), day.getDate()].join('-')}>
                <DayNumber date={day} size="small" highlightOnHover grayOutText={!isSameMonth(props.month, day)} />
            </Fragment>
        );
    }

    return <Fragment>{createGrid()}</Fragment>;
}
