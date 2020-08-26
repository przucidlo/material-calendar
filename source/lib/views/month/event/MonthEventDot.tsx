import { makeStyles } from '@material-ui/core';
import React from 'react';

export interface MonthEventDotProps {
    size?: 'regular' | 'large';
}

const useStyles = makeStyles((theme) => ({
    dot: {
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
        display: 'inline-block',
        marginLeft: 2,
        marginRight: 2,
    },
}));

export default function MonthEventDot(props: MonthEventDotProps) {
    const classes = useStyles(props);

    function getSize(): number {
        if (props.size) {
            if (props.size === 'large') {
                return 12;
            }
        }
        return 8;
    }

    return <div className={classes.dot} style={{ width: getSize(), height: getSize() }}></div>;
}
