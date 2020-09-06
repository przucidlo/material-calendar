import { Typography } from '@material-ui/core';
import React from 'react';
import useLocale from '../../../common/hooks/locale/useLocale';

export interface MonthEventListHeaderProps {
    date: Date;
}

export default function MonthEventListHeader(props: MonthEventListHeaderProps) {
    const locale = useLocale();

    return (
        <div>
            <Typography align="center" variant="subtitle2" gutterBottom>
                {locale.daysShort[props.date.getDay()]}
            </Typography>
            <Typography align="center" variant="h6">
                {props.date.getDate()}
            </Typography>
        </div>
    );
}
