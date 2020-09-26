import { Grid, makeStyles } from '@material-ui/core';
import { eachMonthOfInterval, endOfYear, startOfYear } from 'date-fns';
import React, { Fragment, ReactElement, ReactFragment, useContext, useMemo } from 'react';
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

    function createGridElements(): ReactFragment[] {
        return eachMonthOfInterval({
            start: startOfYear(viewContext.highlightDate),
            end: endOfYear(viewContext.highlightDate),
        }).map((month) => (
            <Fragment key={'year-month-' + month.getMonth()}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <CompactMonth month={month} onDateAvatarClick={props.onDateAvatarClick} />
                </Grid>
            </Fragment>
        ));
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
            {useMemo(() => createGridElements(), [viewContext.highlightDate])}
        </Grid>
    );
}
