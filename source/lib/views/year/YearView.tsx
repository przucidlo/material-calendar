import { Grid } from '@material-ui/core';
import { endOfYear, startOfYear } from 'date-fns';
import { eachMonthOfInterval } from 'date-fns/esm';
import React, { Fragment, ReactElement, ReactFragment, useContext } from 'react';
import CompactMonth from '../../common/components/compactMonth/CompactMonth';
import { ViewContext } from '../../common/contexts/ViewContext';

export default function YearView(): ReactElement {
    const viewContext = useContext(ViewContext);

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
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ minHeight: 'calc(100% - 64px)', marginTop: 16 }}
        >
            {createGridElements()}
        </Grid>
    );
}
