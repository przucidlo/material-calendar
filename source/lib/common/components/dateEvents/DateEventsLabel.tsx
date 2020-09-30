import { makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import DayView from '../../../views/day/DayView';
import useLocale from '../../hooks/locale/useLocale';
import useViewChange from '../../hooks/viewController/useViewChange';
import DateAvatar from '../dateAvatar/DateAvatar';

export interface DateEventsLabelProps {
    date: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function DateEventsLabel(props: DateEventsLabelProps): ReactElement {
    const viewChange = useViewChange();
    const locale = useLocale();
    const classes = useStyles();

    function changeView() {
        viewChange.changeView(DayView);
    }

    return (
        <div className={classes.root}>
            <Typography variant="overline">{locale.daysShort[props.date.getDay()]}</Typography>
            <DateAvatar date={props.date} highlightOnHover size="large" onClick={changeView} />
        </div>
    );
}
