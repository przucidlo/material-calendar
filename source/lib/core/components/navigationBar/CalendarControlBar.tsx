import { Button, createStyles, Grid, Theme, withStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import SelectInput, { SelectInputValueType } from '../../../common/components/selectInput/SelectInput';
import { DateChangeAction } from '../actions/DateChangeAction';
import CalendarControlBarDate from './CalendarControlBarDate';
import CalendarNavigationArrows from './CalendarNavigationArrows';

interface Props {
    classes: {
        controlBar: string;
        gridStyle: string;
        outlinedInput: string;
    };
    date: Date;

    onInputChange?: (value: SelectInputValueType) => void;
    onDateChange: (dateChangeAction: DateChangeAction) => void;
}

const styles = (theme: Theme) =>
    createStyles({
        controlBar: {
            height: 63,
            width: '100%',
            background: theme.palette.common.white,
            borderBottom: '1px solid',
            borderBottomColor: theme.palette.grey[300],
        },
        gridStyle: {
            height: '64px',
            top: 0,
            position: 'sticky',
        },
        outlinedInput: {
            padding: '10px 14px',
        },
    });

function CalendarControlBar(props: Props): ReactElement {
    return (
        <div className={props.classes.controlBar}>
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-around"
                className={props.classes.gridStyle}
            >
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
                        <CalendarNavigationArrows onChangeDate={props.onDateChange} />
                        <CalendarControlBarDate date={props.date} />
                    </Grid>
                </Grid>
                <Grid item>
                    <div style={{ display: 'inline' }}>
                        <SelectInput
                            onInputChange={props.onInputChange}
                            variant="outlined"
                            options={{ day: 'Dzień', week: 'Tydzień', month: 'Miesiąc', schedule: 'Harmonogram' }}
                            style={{ width: 128 }}
                            defaultFirstItem={true}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(CalendarControlBar);
