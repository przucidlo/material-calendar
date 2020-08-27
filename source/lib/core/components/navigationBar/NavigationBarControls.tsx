import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { DateChangeAction } from '../../../common/api/DateChangeAction';
import NavigationBarControlArrows from './NavigationBarControlArrows';
import NavigationBarDateText from './NavigationBarDateText';

export interface NavigationBarControlsProps {
    highlightDate: Date;

    onDateChange: (dateChangeAction: DateChangeAction) => void;
}

export default function NavigationBarControls(props: NavigationBarControlsProps) {
    return (
        <React.Fragment>
            <Grid item>
                <Grid container alignItems="center">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            props.onDateChange(DateChangeAction.TODAY);
                        }}
                    >
                        Dzisiaj
                    </Button>
                    <NavigationBarControlArrows onChangeDate={props.onDateChange} />
                    <NavigationBarDateText highlightDate={props.highlightDate} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
