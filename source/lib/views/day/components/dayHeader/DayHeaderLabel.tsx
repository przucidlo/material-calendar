import { Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';
import useLocale from '../../../../common/hooks/locale/useLocale';

export interface DayHeaderLabelProps {
    highlightDate: Date;
}

export default function DayHeaderLabel(props: DayHeaderLabelProps): ReactElement {
    const locale = useLocale();

    function getDayLabelColor(): 'primary' | 'textSecondary' {
        return isToday(props.highlightDate) ? 'primary' : 'textSecondary';
    }

    return (
        <Typography color={getDayLabelColor()} variant="body1">
            {locale.daysShort[props.highlightDate.getDay()].toLocaleUpperCase()}
        </Typography>
    );
}
