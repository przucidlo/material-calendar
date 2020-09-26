import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CompactMonthGrid from './components/grid/CompactMonthGrid';
import CompactMonthGridHeader from './components/grid/CompactMonthGridHeader';
import CompactMonthLabel from './components/label/CompactMonthLabel';

export interface CompactMonthProps {
    month: Date;

    onDateAvatarClick?: (event: React.MouseEvent<any>) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        minWidth: 224,
        minHeight: 236,
        maxHeight: 236,
        padding: 8,
        userSelect: 'none',
    },
}));

export default function CompactMonth(props: CompactMonthProps): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <CompactMonthLabel month={props.month} />
                <CompactMonthGridHeader />
                <CompactMonthGrid month={props.month} onDateAvatarClick={props.onDateAvatarClick} />
            </div>
        </div>
    );
}
