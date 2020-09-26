import { Grid } from '@material-ui/core';
import React, { useContext, useMemo } from 'react';
import { CalendarView } from '../../../common/api/CalendarView';
import SelectInput, { SelectOption } from '../../../common/components/selectInput/SelectInput';
import { CalendarContext } from '../../../common/contexts/CalendarContext';
import { ViewContext } from '../../../common/contexts/ViewContext';

export default function NavigationBarViewSelect() {
    const viewContext = useContext(ViewContext);
    const calendarContext = useContext(CalendarContext);

    function getSelectInputOptions(): SelectOption<CalendarView>[] {
        return calendarContext.views.map((view) => {
            return { name: view.name[calendarContext.locale], source: view };
        });
    }

    return (
        <React.Fragment>
            <Grid item>
                <div style={{ display: 'inline' }}>
                    {useMemo(
                        () => (
                            <SelectInput
                                onInputChange={viewContext.setView}
                                variant="outlined"
                                options={getSelectInputOptions()}
                                overrideOption={viewContext.view}
                            />
                        ),
                        [viewContext.view],
                    )}
                </div>
            </Grid>
        </React.Fragment>
    );
}
