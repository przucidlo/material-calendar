import { Grid, makeStyles } from '@material-ui/core';
import { eachMonthOfInterval, endOfYear, isSameYear, startOfYear } from 'date-fns';
import React, { Fragment, ReactElement, ReactFragment, useContext, useMemo, useState } from 'react';
import CompactMonth from '../../../../common/components/compactMonth/CompactMonth';
import { ViewContext } from '../../../../common/contexts/ViewContext';

export interface YearGridProps {
    onDateAvatarClick?: (event: React.MouseEvent<any>) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 4,
    },
}));

export default function YearGrid(props: YearGridProps): ReactElement {
    const viewContext = useContext(ViewContext);
    const classes = useStyles();

    /**
     * Grid keeps track of what year it's currently displaying,
     * to prevent unnecessary re-renders due to change of highlightDate
     * in viewContext.
     */
    const [year, setYear] = useState<Date>();

    /**
     * Creates CompactMonth component for every month in year.
     */
    function createCompactMonths(): ReactFragment[] {
        return eachMonthOfInterval({
            start: startOfYear(viewContext.highlightDate),
            end: endOfYear(viewContext.highlightDate),
        }).map((month) => (
            <Fragment key={'year-month-' + month.getMonth()}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <CompactMonth month={month} onDateAvatarClick={onDateAvatarClickMiddleware} />
                </Grid>
            </Fragment>
        ));
    }

    /**
     * Sets highlightDate to the day that was selected
     * by user in CompactMonth and sets grid year to
     * highlightDate only if it's different then the
     * one selected now.
     *
     * Forwards the callback to parent component.
     */
    function onDateAvatarClickMiddleware(event: React.MouseEvent<any>, day: Date): void {
        viewContext.setHighlightDate(day);

        changeGridYear(day);

        // Forward event to parent.
        props.onDateAvatarClick(event);
    }

    /**
     * Changes currently displayed year only
     * If It's different than previous one.
     */
    function changeGridYear(highlightDate: Date): void {
        if (!isSameYear(year, highlightDate)) {
            setYear(highlightDate);
        }
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
            {useMemo(() => createCompactMonths(), [year])}
        </Grid>
    );
}
