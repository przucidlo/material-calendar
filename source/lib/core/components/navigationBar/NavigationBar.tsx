import { Grid, makeStyles } from '@material-ui/core';
import React, { ReactElement, useContext } from 'react';
import { DateChangeAction } from '../../../common/api/DateChangeAction';
import { CalendarContext } from '../../../common/contexts/CalendarContext';
import { ViewContext } from '../../../common/contexts/ViewContext';
import NavigationBarControls from './NavigationBarControls';
import NavigationBarViewSelect from './NavigationBarViewSelect';

interface NavigationBarProps {
    onDateChangeAction: (dateChangeAction: DateChangeAction) => void;
}

const useStyles = makeStyles((theme) => ({
    navigationBar: {
        height: 63,
        width: '100%',
        background: theme.palette.common.white,
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
    },
    gridStyle: {
        height: 63,
        top: 0,
        position: 'sticky',
    },
}));

function NavigationBar(props: NavigationBarProps): ReactElement {
    const calendarContext = useContext(CalendarContext);
    const viewContext = useContext(ViewContext);
    const classes = useStyles();

    return (
        <div className={classes.navigationBar}>
            <Grid container direction="row" alignItems="center" justify="space-around" className={classes.gridStyle}>
                <NavigationBarControls
                    onDateChange={props.onDateChangeAction}
                    highlightDate={viewContext.highlightDate}
                />

                <NavigationBarViewSelect views={calendarContext.views} onViewChange={viewContext.setView} />
            </Grid>
        </div>
    );
}

export default NavigationBar;
