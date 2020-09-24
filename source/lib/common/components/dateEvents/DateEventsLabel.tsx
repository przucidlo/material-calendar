import { makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import useLocale from '../../hooks/locale/useLocale';
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
    const classes = useStyles();
    const locale = useLocale();

    return (
        <div className={classes.root}>
            <Typography variant="overline">{locale.daysShort[props.date.getDay()]}</Typography>
            <DateAvatar date={props.date} highlightOnHover size="large" />
        </div>
    );
}
