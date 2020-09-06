import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

export interface TimeGridProps {
    gridElementHeight: number;
    width: number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        // gridElementHeight - halfOfFontSize.
        // This value is used to align time grid to day grid.
        marginTop: (props: any) => props.gridElementHeight - 17 / 2,

        backgroundColor: theme.palette.background.paper,
        minWidth: (props: any) => props.width,
        textAlign: 'center',
    },
    timeText: {
        color: theme.palette.grey[800],
    },
}));

export default function TimeGrid(props: TimeGridProps) {
    const classes = useStyles({ width: props.width, gridElementHeight: props.gridElementHeight });
    const elementsAmount = 24;

    function createGrid() {
        let array = [];

        for (let i = 1; i < elementsAmount; i++) {
            array.push(
                <div key={i} style={{ height: props.gridElementHeight }}>
                    <Typography variant="subtitle2" className={classes.timeText}>
                        {i}:00
                    </Typography>
                </div>,
            );
        }

        return array;
    }

    return <div className={classes.root}>{createGrid()}</div>;
}
