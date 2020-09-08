import { Grid } from '@material-ui/core';
import React, { useContext, useMemo } from 'react';
import { CalendarView } from '../../../common/api/CalendarView';
import SelectInput, { SelectOption } from '../../../common/components/selectInput/SelectInput';
import { ViewContext } from '../../../common/contexts/ViewContext';

export interface NavigationBarViewSelect {
    views: CalendarView[];

    onViewChange?: (value: CalendarView) => void;
}

export default function NavigationBarViewSelect(props: NavigationBarViewSelect) {
    const viewContext = useContext(ViewContext);

    function getSelectInputOptions(): SelectOption<CalendarView>[] {
        return props.views.map((view) => {
            return { name: view.name['pl'], source: view };
        });
    }

    return (
        <React.Fragment>
            <Grid item>
                <div style={{ display: 'inline' }}>
                    {useMemo(
                        () => (
                            <SelectInput
                                onInputChange={props.onViewChange}
                                variant="outlined"
                                options={getSelectInputOptions()}
                                overrideOption={viewContext.view}
                            />
                        ),
                        [props.views, viewContext.view],
                    )}
                </div>
            </Grid>
        </React.Fragment>
    );
}
