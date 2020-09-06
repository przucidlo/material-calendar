import { Avatar, makeStyles, Typography, useTheme } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';
import CalendarEvent from '../../../common/api/CalendarEvent';
import ExpandableContainer from '../../../common/components/expandableContainer/ExpandableContainer';
import { daysNamesShort } from '../../../locale/DaysNames';
import { monthsNameShort } from '../../../locale/MonthsNames';
import MonthEvent from '../event/MonthEvent';
import MonthEventListPopover from '../eventListPopover/MonthEventListPopover';

interface MonthGridElementProps {
    date: Date;
    displayDayOfWeekIndication: boolean;
    indicatePreviousMonth: boolean;
    dayEvents: CalendarEvent[];
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
    const theme = useTheme();
    const classes = useStyles();
    const dayNumber = props.date.getDate();

    function displayDayDate() {
        return (
            <div className={classes.dayDate}>
                {displayDayName()}
                {displayDayNumber()}
                {displayMonthName()}
            </div>
        );
    }

    function displayDayName() {
        if (props.displayDayOfWeekIndication) {
            return (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant="subtitle2">{daysNamesShort[props.date.getDay()]}</Typography>
                </div>
            );
        }
        return null;
    }

    /**
     * Displays day number and If displayed date is today,
     * it wraps it in circle that indicates it.
     */
    function displayDayNumber() {
        if (isToday(props.date)) {
            return (
                <Avatar
                    style={{
                        width: theme.spacing(3),
                        height: theme.spacing(3),
                        fontSize: '0.875rem',
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    {dayNumber}
                </Avatar>
            );
        }
        return <div>{dayNumber}</div>;
    }

    /**
     * Displays the short name of the month on every fist day of it.
     */
    function displayMonthName() {
        if (dayNumber === 1) {
            return (
                <div>
                    <Typography variant="body2" style={{ marginLeft: 2 }}>
                        {monthsNameShort[props.date.getMonth()]}
                    </Typography>
                </div>
            );
        }
        return null;
    }

    const monthEvents = props.dayEvents.map((dayEvent) => <MonthEvent event={dayEvent} key={dayEvent.id} />);

    return (
        <div
            style={{
                backgroundColor: props.indicatePreviousMonth ? theme.palette.grey[100] : theme.palette.common.white,
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
