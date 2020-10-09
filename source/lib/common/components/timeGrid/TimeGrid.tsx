import { makeStyles, Typography } from '@material-ui/core';
import React, { useRef } from 'react';

export interface TimeGridProps {
    cellHeight: number;
    width: number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center',
    },
    timeText: {
        color: theme.palette.grey[800],
    },
}));

export default function TimeGrid(props: TimeGridProps) {
    const classes = useStyles();
    const numberOfHours = 24;

    let typographyRef = useRef<HTMLDivElement>(null);

    function createGrid() {
        let elements = [];

        for (let i = 1; i < numberOfHours; i++) {
            elements.push(
                <div key={i} style={{ height: props.cellHeight }}>
                    <Typography variant="subtitle2" className={classes.timeText} innerRef={typographyRef}>
                        {i}:00
                    </Typography>
                </div>,
            );
        }

        return elements;
    }

    /**
     * Calculates offset that helps with aligning of grids
     */
    function getOffsetTop(): number {
        if(typographyRef.current) {
            const fontHeight: number = typographyRef.current.clientHeight;
            
            // gridElementHeight - halfOfFontSize.
            return props.cellHeight - (fontHeight / 2);
        }

        return 0;
    }

    return <div style={{marginTop: getOffsetTop(), width: props.width}} className={classes.root}>{createGrid()}</div>;
}
