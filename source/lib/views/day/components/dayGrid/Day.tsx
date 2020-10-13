import { useTheme } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {
    hideBorder?: boolean;
    hour?: number;
    hideHours?: boolean;
}

function Day(props: Props): ReactElement {
    const theme = useTheme();

    return (
        <div style={{ flexDirection: 'row', display: 'flex', backgroundColor: theme.palette.common.white }}>
            <div
                style={{
                    height: 48,
                    borderTop: props.hideBorder ? '0px solid' : '1px solid',
                    borderTopColor: theme.palette.grey[300],
                    borderLeft: '1px solid',
                    borderLeftColor: theme.palette.grey[300],
                    display: 'flex',
                    flexGrow: 1,
                }}
            ></div>
        </div>
    );
}

export default Day;
