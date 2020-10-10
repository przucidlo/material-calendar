import { makeStyles } from '@material-ui/core';
import React, { ReactElement, useLayoutEffect, useState } from 'react';

interface HourIndicatorProps {
    cellHeight: number
}

const useStyles = makeStyles((theme) => ({
    indicator: {
        '&::before': {
            content: '""',
            
            position: 'absolute',
            marginTop: -4,
            marginLeft: -4.5,

            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ea4335',
        },

        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        height: '2px',
        backgroundColor: '#ea4335',
        width: '100%',
    },
}))

export default function HourIndicator(props: HourIndicatorProps): ReactElement {
    const pixelPerMinute = props.cellHeight / 60;
    const [time, setTime] = useState<Date>(new Date());
    const classes = useStyles();

    let positionInterval: NodeJS.Timeout = null;

    useLayoutEffect(() => {
        // Setting a timeout to start the interval exactly on minute start.
        const timeout = setTimeout(() => {
            setTime(new Date());

            startPositionInterval();
        }, (60 - time.getSeconds() ) * 1000)
        

        return () => {
            clearTimeout(timeout);
            clearInterval(positionInterval);
        }
    }, [])

    function startPositionInterval(): void {
        // Update time saved in component every minute.
        positionInterval = setInterval(() => {
            setTime(new Date());
        }, 60 * 1000)
    }

    function getIndicatorPosition(): number {
        return (time.getHours() * props.cellHeight) + (time.getMinutes() * pixelPerMinute);
    }

    return (
        <div className={classes.indicator} style={{top: getIndicatorPosition()}}/>
    )
}
