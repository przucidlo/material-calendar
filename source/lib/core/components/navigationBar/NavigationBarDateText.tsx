import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import useLocale from '../../../common/hooks/locale/useLocale';

interface NavigationBarDateTextProps {
    highlightDate: Date;

    highlightDateDescription?: (highlightDate: Date) => string;
}

export default function NavigationBarDateText(props: NavigationBarDateTextProps): ReactElement {
    const locale = useLocale();

    function getText(): string {
        if (props.highlightDateDescription) {
            return props.highlightDateDescription(props.highlightDate);
        }
        return String(locale.months[props.highlightDate.getMonth()] + ' ' + props.highlightDate.getFullYear());
    }

    return (
        <Typography align="center" variant="h5" style={{ display: 'inline' }}>
            {getText()}
        </Typography>
    );
}
