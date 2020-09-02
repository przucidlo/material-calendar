import { Grid } from '@material-ui/core';
import React, { useMemo } from 'react';
import { CalendarView } from '../../../common/api/CalendarView';
import SelectInput, { SelectOption } from '../../../common/components/selectInput/SelectInput';

export interface NavigationBarViewSelect {
    views: CalendarView[];

    onViewChange?: (value: CalendarView) => void;
}

export default function NavigationBarViewSelect(props: NavigationBarViewSelect) {
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
                            />
                        ),
                        [props.views],
                    )}
                </div>
            </Grid>
        </React.Fragment>
    );
}
