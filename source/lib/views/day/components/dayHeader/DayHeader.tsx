import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import DayHeaderContent from './DayHeaderContent';

interface Props {
    highlightDate: Date;
    center?: boolean;
    intendHoursGap?: boolean;
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
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

function DayHeader(props: Props): ReactElement {
    const classes = useStyle();

    function getContentJustification(): string {
        return props.center ? 'center' : 'normal';
    }

    return (
        <div className={classes.root}>
            <div className={classes.headerContent} style={{ justifyContent: getContentJustification() }}>
                <DayHeaderContent highlightDate={props.highlightDate} />
            </div>
        </div>
    );
}

export default DayHeader;
