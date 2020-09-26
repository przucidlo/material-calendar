import { Grid, makeStyles, Popover } from '@material-ui/core';
import { endOfYear, startOfYear } from 'date-fns';
import { eachMonthOfInterval } from 'date-fns/esm';
import React, { Fragment, ReactElement, ReactFragment, useContext, useMemo, useState } from 'react';
import CompactMonth from '../../common/components/compactMonth/CompactMonth';
import DateEvents from '../../common/components/dateEvents/DateEvents';
import { EventStorageContext } from '../../common/contexts/EventStorageContext';
import { ViewContext } from '../../common/contexts/ViewContext';
import bindPopover from '../../common/hooks/popover/bindPopover';
import togglePopover from '../../common/hooks/popover/togglePopover';
import usePopover from '../../common/hooks/popover/usePopover';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
    },
    grid: {
        marginTop: 4,
    },
    popover: {
        width: 224,
    },
}));

export default function YearView(): ReactElement {
    const viewContext = useContext(ViewContext);
    const eventStorageContext = useContext(EventStorageContext);

    const popoverState = usePopover();
    const classes = useStyles();

    const [year, setYear] = useState(new Date());

    function createGridElements(): ReactFragment[] {
        return eachMonthOfInterval({
            start: startOfYear(viewContext.highlightDate),
            end: endOfYear(viewContext.highlightDate),
        }).map((month) => (
            <Fragment key={'year-month-' + month.getMonth()}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <CompactMonth month={month} onDateAvatarClick={openPopover} />
                </Grid>
            </Fragment>
        ));
    }

    function openPopover(event: React.MouseEvent<any>): void {
        togglePopover(popoverState).onClick(event);
    }

    return (
        <div className={classes.root}>
            <Popover
                {...bindPopover(popoverState)}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popover}>
                    <DateEvents
                        date={viewContext.highlightDate}
                        onClose={popoverState.closePopover}
                        eventStorage={eventStorageContext.eventStorage}
                    />
                </div>
            </Popover>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.grid}>
                {useMemo(() => createGridElements(), [viewContext.highlightDate])}
            </Grid>
        </div>
    );
}

// YearView.whyDidYouRender = true;
