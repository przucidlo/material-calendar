import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import DateAvatar from '../../../common/components/dateAvatar/DateAvatar';
import useLocale from '../../../common/hooks/locale/useLocale';

export interface MonthEventListHeaderProps {
    date: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function MonthEventListHeader(props: MonthEventListHeaderProps) {
    const classes = useStyles();
    const locale = useLocale();
    
    return (
        <div className={classes.root}>
            <Typography align="center" variant="subtitle2" gutterBottom>
                {locale.daysShort[props.date.getDay()]}
            </Typography>
            <DateAvatar date={props.date} highlightOnHover/>
        </div>
    );
}
