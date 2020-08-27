import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

interface NavigationBarDateTextProps {
    highlightDate: Date;
}

export default function NavigationBarDateText(props: NavigationBarDateTextProps): ReactElement {
    const months = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ];

    return (
        <Typography align="center" variant="h5" style={{ display: 'inline' }}>
            {months[props.highlightDate.getMonth()] + ' ' + props.highlightDate.getFullYear()}
        </Typography>
    );
}
