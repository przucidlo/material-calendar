import { makeStyles } from '@material-ui/core';
import React from 'react';
import TimeGrid from '../../../../common/components/timeGrid/TimeGrid';
import TimeGridLines from '../../../../common/components/timeGrid/TimeGridLines';
import { NAVIGATION_BAR_HEIGHT } from '../../../../core/components/navigationBar/NavigationBar';

interface WeekTimeGridProps {
    headerHeight: number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 56,
        overflow: 'hidden',
    },
    headerSpacer: {
        backgroundColor: 'rgba(0, 0, 0, 0.0);',
        width: '100%',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
    },
}));

const WeekTimeGrid = React.forwardRef<HTMLDivElement, WeekTimeGridProps>((props, ref) => {
    const classes = useStyles();

    function getHeight(): string {
        // FIXME: 32px - is a cheap trick to align the grid and ignore shifting height of WeekGrid
        return `calc(100vh - ${NAVIGATION_BAR_HEIGHT}px - ${props.headerHeight}px - 32px)`;
    }

    function getHeaderSpacerHeight(): number {
        // Minus one pixel cause border adds one extra pixel.
        return props.headerHeight - 1;
    }

    return (
        <div style={{ flexBasis: '56px' }}>
            <div className={classes.headerSpacer} style={{ minHeight: getHeaderSpacerHeight() }} />

            <div className={classes.root} ref={ref} style={{ maxHeight: getHeight(), display: 'flex' }}>
                <TimeGrid width={48} cellHeight={48} />
                <TimeGridLines cellHeight={48} />
            </div>
        </div>
    );
});

export default WeekTimeGrid;
