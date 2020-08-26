import { Typography } from '@material-ui/core';
import React from 'react';
import { daysNamesShort } from '../../../language/DaysNames';

export interface MonthEventListHeaderProps {
    date: Date;
}

export default function MonthEventListHeader(props: MonthEventListHeaderProps) {
    return (
        <div>
            <Typography align="center" variant="subtitle2" gutterBottom>
                {daysNamesShort[props.date.getDay()]}
            </Typography>
            <Typography align="center" variant="h6">
                {props.date.getDate()}
            </Typography>
        </div>
    );
}
