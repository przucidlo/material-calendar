import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment, ReactElement, useMemo } from 'react';
import MonthEvent from '../../../views/month/event/MonthEvent';
import CalendarEvent from '../../api/CalendarEvent';
import { EventStorage } from '../../api/EventStorage';
import useLocale from '../../hooks/locale/useLocale';
import CalendarEventUtils from '../../tools/CalendarEventUtils';

export interface DateEventsContent {
    eventStorage: EventStorage;
    date: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        paddingTop: 0,
    },
    emptyResultFont: {
        fontSize: '12px',
    },
}));

export default function DateEventsContent(props: DateEventsContent): ReactElement {
    const events: CalendarEvent[] = CalendarEventUtils.getDayEvents(props.eventStorage, props.date);
    const locale = useLocale();
    const classes = useStyles();

    function getContent(): ReactElement | ReactElement[] {
        if (events) {
            if (events.length === 0) {
                return getEmptyResultMessage();
            }

            return events.map((event) => (
                <Fragment key={event.id}>
                    <MonthEvent event={event} />
                </Fragment>
            ));
        }
        return <LinearProgress />;
    }

    function getEmptyResultMessage(): ReactElement {
        return (
            <Typography variant="subtitle2" className={classes.emptyResultFont}>
                {locale.noEventsForThisDay}
            </Typography>
        );
    }
    // Re-render the content only If eventStorage prop changes.
    return <div className={classes.root}>{useMemo(() => getContent(), [props.eventStorage])}</div>;
}
