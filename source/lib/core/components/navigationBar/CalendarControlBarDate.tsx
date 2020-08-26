import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
    date: Date;
}

export default function CalendarControlBarDate(props: Props): ReactElement {
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
            {months[props.date.getMonth()] + ' ' + props.date.getFullYear()}
        </Typography>
    );
}
