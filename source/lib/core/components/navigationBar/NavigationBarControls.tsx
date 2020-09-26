import { Button, Grid } from '@material-ui/core';
import { isSameDay } from 'date-fns';
import React, { useContext } from 'react';
import { DateChangeAction } from '../../../common/api/DateChangeAction';
import { ViewContext } from '../../../common/contexts/ViewContext';
import NavigationBarControlArrows from './NavigationBarControlArrows';
import NavigationBarDateText from './NavigationBarDateText';

export default function NavigationBarControls() {
    const viewContext = useContext(ViewContext);

    /**
     * Changes the currently focused date of the calendar based on provided DataChangeAction parameter.
     * @param dateChangeAction
     */
    function handleDateChange(dateChangeAction: DateChangeAction) {
        if (dateChangeAction === DateChangeAction.TODAY) {
            // Prevent from setting same day once again, which will trigger unnecessary re-render.
            if (!isSameDay(Date.now(), viewContext.highlightDate)) {
                viewContext.setHighlightDate(new Date());
            }

            return;
        }
        const view = viewContext.view;

        if (view && view.onDateChange) {
            viewContext.setHighlightDate(view.onDateChange(dateChangeAction, viewContext.highlightDate));
        }
    }

    return (
        <React.Fragment>
            <Grid item>
                <Grid container alignItems="center">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            handleDateChange(DateChangeAction.TODAY);
                        }}
                    >
                        Dzisiaj
                    </Button>
                    <NavigationBarControlArrows onChangeDate={handleDateChange} />
                    <NavigationBarDateText highlightDate={viewContext.highlightDate} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

// NavigationBarControls.whyDidYouRender = true;
