import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import DateAvatar from '../../../common/components/dateAvatar/DateAvatar';
import useLocale from '../../../common/hooks/locale/useLocale';
import useViewChange from '../../../common/hooks/viewController/useViewChange';
import DayView from '../../day/DayView';

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
    const viewChange = useViewChange();
    const classes = useStyles();
    const locale = useLocale();
    
    function openChildView(event: React.MouseEvent<any, MouseEvent>, date: Date): void {
        viewChange.changeView(DayView, date);
    }

    return (
        <div className={classes.root}>
            <Typography align="center" variant="subtitle2" gutterBottom>
                {locale.daysShort[props.date.getDay()]}
            </Typography>
            <DateAvatar date={props.date} highlightOnHover onClick={openChildView}/>
        </div>
    );
}
