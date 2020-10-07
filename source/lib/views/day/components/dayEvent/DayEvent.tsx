import { makeStyles, Typography } from '@material-ui/core';
import { differenceInMinutes, format } from 'date-fns';
import React from 'react';
import CalendarEvent from '../../../../common/api/CalendarEvent';

export interface DayEvent {
    calendarEvent: CalendarEvent;
    cellHeight: number;

    orderInChain: number;
    chainCount: { count: number };

    onClick?: (event: React.MouseEvent<any, any>, calendarEvent?: CalendarEvent) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        position: 'absolute',
    },
    card: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        height: 'calc(100%)',
        borderRadius: '4px',
        borderTop: '1px solid white',
    },
    cardBorder: {
        border: '1px solid white',
        borderRight: 0,
    },
    textContainerCommon: {
        paddingLeft: 4,
    },
    textContainerLarge: {
        paddingTop: 4,
    },
    fontSmall: {
        lineHeight: '12px',
        fontSize: '12px',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    fontMedium: {
        lineHeight: '13px',
        fontSize: '13px',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    fontRegular: {
        lineHeight: '14px',
        fontSize: '13px',
    },
}));

export default function DayEvent(props: DayEvent) {
    const classes = useStyles();

    const numberOfSections = getNumberOfSections();
    const isSmallVariantActive: boolean = numberOfSections <= 2;

    const cardClasses = [classes.card, getCardBorder()].join(' ');
    const containerClassses = [classes.textContainerCommon, getContainerVariant()].join(' ');
    const fontClasses = getFontVariant();

    function getNumberOfSections(): number {
        const durationInMinutes = differenceInMinutes(props.calendarEvent.finishedAt, props.calendarEvent.startedAt);
        const result = Math.round(durationInMinutes / 15);

        // Always display at least one section.
        return result >= 1 ? result : 1;
    }

    /**
     * Divides length of the event into the sections
     * and multiplies it by size of the cell.
     */
    function getHeight(): number {
        return numberOfSections * (props.cellHeight / 4);
    }

    /**
     * Calculates remaining width of the element by
     * subtracking positionInChain from 100%.
     */
    function getWidth(): string {
        return String(100 - getPositionInChain() + '%');
    }

    /**
     * Calculates X position of the element based on
     * size of the chainCount and orderInChain of the element.
     */
    function getPositionLeft(): string {
        return String(getPositionInChain() + '%');
    }

    /**
     * Calculates which part of the chain belongs
     * to this element.
     */
    function getPositionInChain(): number {
        return (100 / props.chainCount.count) * (props.orderInChain - 1);
    }

    /**
     * Calculates Y position of the element based on
     * when the event startedAt property.
     */
    function getPositionTop(): number {
        const startedAt = props.calendarEvent.startedAt;

        // (hours + (minutes/hour)) * cellHeight.
        return (startedAt.getHours() + roundMinutes(startedAt) / 60) * props.cellHeight;
    }

    /**
     * Rounds minutes to provided values to make
     * display of the grid "snappy".
     */
    function roundMinutes(startedAt: Date): number {
        const startedAtMinutes = startedAt.getMinutes();
        const points: number[] = [45, 30, 15, 0];

        for (let point of points) {
            if (startedAtMinutes >= point) {
                return point;
            }
        }

        return 0;
    }

    /*
     *  Card related functions.
     */

    function forwardOnClick(mouseEvent: React.MouseEvent<any, any>): void {
        if (props.onClick) {
            props.onClick(mouseEvent, props.calendarEvent);
        }
    }

    function getEventTitle(): string {
        if (isSmallVariantActive) {
            return String(props.calendarEvent.title + ',');
        }
        return props.calendarEvent.title;
    }

    function getEventDuration(): string {
        return String(formatHour(props.calendarEvent.startedAt) + ' - ' + formatHour(props.calendarEvent.finishedAt));
    }

    function getCardBorder(): string {
        if (props.orderInChain > 1) {
            return classes.cardBorder;
        }
        return '';
    }

    function getFontVariant(): string {
        switch (numberOfSections) {
            case 1:
                return classes.fontSmall;
            case 2:
                return classes.fontMedium;
            default:
                return classes.fontRegular;
        }
    }

    function formatHour(hour: Date): string {
        return format(hour, 'HH:mm');
    }

    function getContainerVariant(): string {
        return isSmallVariantActive ? '' : classes.textContainerLarge;
    }

    return (
        <div
            style={{
                width: getWidth(),
                height: getHeight(),
                top: getPositionTop(),
                left: getPositionLeft(),
            }}
            className={classes.root}
        >
            <div className={cardClasses} onClick={forwardOnClick}>
                <div className={containerClassses}>
                    <Typography variant="subtitle2" className={fontClasses} noWrap>
                        {getEventTitle()}
                    </Typography>{' '}
                    <Typography variant="subtitle2" className={fontClasses} noWrap>
                        {getEventDuration()}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
