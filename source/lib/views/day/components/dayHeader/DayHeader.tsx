import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import DayHeaderContent from './DayHeaderContent';

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
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        height: '100%',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

function DayHeader(props: DayHeaderProps): ReactElement {
    const classes = useStyle();

    function getContentJustification(): string {
        return props.center ? 'center' : 'normal';
    }

    return (
        <div className={classes.root}>
            <div className={classes.headerContent} style={{ justifyContent: getContentJustification() }}>
                <DayHeaderContent highlightDate={props.highlightDate} timeGridWidth={props.headerContentLeftOffset} />
            </div>
        </div>
    );
}

export default DayHeader;
