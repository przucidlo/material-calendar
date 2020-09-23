import React, { ReactElement, Fragment } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import DayNumber from '../../../dayNumber/DayNumber';
import DateUtils from '../../../../tools/DateUtils';

export interface CompactMonthGridProps {
    /**
     * Date set to any day inside of a month.
     */
    month: Date;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto auto',
    },
}));

export default function CompactMonthGrid(props: CompactMonthGridProps): ReactElement {
    const classes = useStyles();

    function createGrid(): ReactElement[] {
        const gridDays = DateUtils.getWeeksDaysOfMonth(props.month);
        let rows: ReactElement[] = [];
        let columns: ReactElement[] = [];

        gridDays.forEach((day, i) => {
            columns.push(createGridElement(day));

            if ((i + 1) % 7 === 0) {
                rows.push(
                    <div className={classes.container} key={['compact-grid-row', day.getMonth(), i].join('-')}>
                        {columns}
                    </div>,
                );

                columns = [];
            }
        });

        return rows;
    }

    function createGridElement(day: Date): ReactElement {
        return (
            <Fragment key={['compact-grid-element', day.getMonth(), day.getDate()].join('-')}>
                <DayNumber date={day} size="small" highlightOnHover />
            </Fragment>
        );
    }

    return <Fragment>{createGrid()}</Fragment>;
}
