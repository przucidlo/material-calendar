import { Grid, makeStyles } from '@material-ui/core';
import { endOfYear, startOfYear } from 'date-fns';
import { eachMonthOfInterval } from 'date-fns/esm';
import React, { Fragment, ReactElement, ReactFragment, useContext } from 'react';
import CompactMonth from '../../common/components/compactMonth/CompactMonth';
import { ViewContext } from '../../common/contexts/ViewContext';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
    },
    grid: {
        marginTop: 4,
    },
}));

export default function YearView(): ReactElement {
    const viewContext = useContext(ViewContext);
    const classes = useStyles();

    function createGridElements(): ReactFragment[] {
        return eachMonthOfInterval({
            start: startOfYear(viewContext.highlightDate),
            end: endOfYear(viewContext.highlightDate),
        }).map((month) => (
            <Fragment key={'year-month-' + month.getMonth()}>
                <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
                    <CompactMonth month={month} />
                </Grid>
            </Fragment>
        ));
    }

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.grid}>
                {createGridElements()}
            </Grid>
        </div>
    );
}
