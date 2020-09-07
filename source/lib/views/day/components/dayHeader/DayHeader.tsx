import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import DayHeaderLabel from './DayHeaderLabel';
import DayHeaderNumber from './DayHeaderNumber';

interface DayHeaderProps {
    /**
     * Date to which header is bound to.
     */
    highlightDate: Date;

    /**
     * Opens DayView by clicking on trigger in DayHeaderContent.
     *
     * @default false
     */
    openChildView?: boolean;

    /**
     * Sets justifyContent to center.
     */
    center?: boolean;

    /**
     * Offset from left margin that will be added to header content.
     */
    headerContentLeftOffset?: number;
}

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
    },
    headerContentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        height: '100%',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    headerContent: {
        marginLeft: (props: any) => props.marginLeftOffset,

        width: 96,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function DayHeader(props: DayHeaderProps): ReactElement {
    const classes = useStyle({ marginLeftOffset: props.headerContentLeftOffset ? props.headerContentLeftOffset : 0 });

    function getContentJustification(): string {
        return props.center ? 'center' : 'normal';
    }

    return (
        <div className={classes.root}>
            <div className={classes.headerContentWrapper} style={{ justifyContent: getContentJustification() }}>
                <div className={classes.headerContent}>
                    <DayHeaderLabel highlightDate={props.highlightDate} />
                    <DayHeaderNumber highlightDate={props.highlightDate} openDayViewOnClick={props.openChildView} />
                </div>
            </div>
        </div>
    );
}

export default DayHeader;
