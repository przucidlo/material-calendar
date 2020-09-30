import { makeStyles, Typography, useTheme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../common/api/CalendarEvent';
import DateAvatar from '../../../common/components/dateAvatar/DateAvatar';
import ExpandableContainer from '../../../common/components/expandableContainer/ExpandableContainer';
import useLocale from '../../../common/hooks/locale/useLocale';
import useViewChange from '../../../common/hooks/viewController/useViewChange';
import DayView from '../../day/DayView';
import MonthEvent from '../event/MonthEvent';
import MonthEventListPopover from '../eventListPopover/MonthEventListPopover';

interface MonthGridElementProps {
    date: Date;
    displayDayOfWeekIndication: boolean;
    indicatePreviousMonth: boolean;
    dayEvents: CalendarEvent[] | undefined;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: 1,

        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
        borderRight: '1px solid',
        borderRightColor: theme.palette.grey[300],
    },
    dayDate: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 2,
        flexWrap: 'wrap',
        minHeight: 40,
    },
    elementContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
}));

function MonthGridElement(props: MonthGridElementProps): ReactElement {
    const monthEvents = getMonthEvents();
    const viewChange = useViewChange();
    const locale = useLocale();
    const theme = useTheme();
    const classes = useStyles();

    function changeView() {
        viewChange.changeView(DayView, props.date);
    }

    function displayDayDate() {
        return (
            <div className={classes.dayDate}>
                {displayDayName()}
                <DateAvatar date={props.date} size="small" highlightOnHover onClick={changeView} />
            </div>
        );
    }

    function displayDayName() {
        if (props.displayDayOfWeekIndication) {
            return (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant="subtitle2">{locale.daysShort[props.date.getDay()]}</Typography>
                </div>
            );
        }
        return null;
    }

    function getMonthEvents(): ReactElement[] {
        if (props.dayEvents) {
            return props.dayEvents.map((dayEvent) => <MonthEvent event={dayEvent} key={dayEvent.id} />);
        }
        return [];
    }

    return (
        <div
            style={{
                backgroundColor: props.indicatePreviousMonth ? theme.palette.grey[50] : theme.palette.common.white,
            }}
            className={classes.root}
        >
            <div className={classes.elementContent}>
                {displayDayDate()}
                <ExpandableContainer
                    elementHeight={20}
                    elements={monthEvents}
                    expandMoreComponent={(remainingElements) => (
                        <MonthEventListPopover
                            date={props.date}
                            remainingEvents={remainingElements}
                            eventsComponent={monthEvents}
                        />
                    )}
                />
            </div>
        </div>
    );
}

export default MonthGridElement;
