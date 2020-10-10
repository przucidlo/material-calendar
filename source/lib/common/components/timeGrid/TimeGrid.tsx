import { makeStyles, Typography } from '@material-ui/core';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

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
    const [fontHeight, setFontHeight] = useState<number>(0);    
    const numberOfHours = 24;
    const classes = useStyles();

    let typographyRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(typographyRef){
            const typographyHeight: number = typographyRef.current.clientHeight;

            setFontHeight(typographyHeight);
        }
    }, [])

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
            // gridElementHeight - halfOfFontSize.
            return props.cellHeight - (fontHeight / 2);
        }

        return 0;
    }

    return <div style={{marginTop: getOffsetTop(), width: props.width}} className={classes.root}>{useMemo(() => createGrid(), [numberOfHours])}</div>;
}
