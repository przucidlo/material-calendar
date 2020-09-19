import React, { ReactElement, ReactNode, Fragment } from 'react';
import CompactMonthGridHeader from './CompactMonthGridHeader';
import { Grid, Typography } from '@material-ui/core';
import DayNumber from '../../../dayNumber/DayNumber';
import DateUtils from '../../../../tools/DateUtils';
import useLocale from '../../../../hooks/locale/useLocale';

export interface CompactMonthGridProps {
    /**
     * Date set to any day inside of a month.
     */
    month: Date;
}

export default function CompactMonthGrid(props: CompactMonthGridProps): ReactElement {
    function createGrid(): ReactElement[] {
        const gridDays = DateUtils.getWeeksDaysOfMonth(props.month);
        let rows: ReactElement[] = [];
        let columns: ReactElement[] = [];

        gridDays.forEach((day, i) => {
            columns.push(createGridElement(day));

            if ((i + 1) % 7 === 0) {
                rows.push(
                    <Grid container spacing={1}>
                        {columns}
                    </Grid>,
                );

                columns = [];
            }
        });

        return rows;
    }

    function createGridElement(day: Date): ReactElement {
        return (
            <Fragment>
                <Grid item>
                    <DayNumber highlightDate={day} size="small" openDayViewOnClick />
                </Grid>
            </Fragment>
        );
    }

    return <Fragment>{createGrid()}</Fragment>;
}
