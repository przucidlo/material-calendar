import { Grid, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { DateChangeAction } from '../../../common/api/DateChangeAction';
import { SelectInputValueType } from '../../../common/components/selectInput/SelectInput';
import NavigationBarControls from './NavigationBarControls';
import NavigationBarViewSelect from './NavigationBarViewSelect';

interface NavigationBarProps {
    highlightDate: Date;

    onViewChange?: (value: SelectInputValueType) => void;
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
    const classes = useStyles();

    return (
        <div className={classes.navigationBar}>
            <Grid container direction="row" alignItems="center" justify="space-around" className={classes.gridStyle}>
                <NavigationBarControls onDateChange={props.onDateChangeAction} highlightDate={props.highlightDate} />

                <NavigationBarViewSelect onViewChange={props.onViewChange} />
            </Grid>
        </div>
    );
}

export default NavigationBar;
