import { Grid } from '@material-ui/core';
import React from 'react';
import SelectInput, { SelectInputValueType } from '../../../common/components/selectInput/SelectInput';

export interface NavigationBarViewSelect {
    onViewChange?: (value: SelectInputValueType) => void;
}

export default function NavigationBarViewSelect(props: NavigationBarViewSelect) {
    return (
        <React.Fragment>
            <Grid item>
                <div style={{ display: 'inline' }}>
                    <SelectInput
                        onInputChange={props.onViewChange}
                        variant="outlined"
                        options={{ day: 'Dzień', week: 'Tydzień', month: 'Miesiąc', schedule: 'Harmonogram' }}
                        style={{ width: 128 }}
                        defaultFirstItem={true}
                    />
                </div>
            </Grid>
        </React.Fragment>
    );
}
