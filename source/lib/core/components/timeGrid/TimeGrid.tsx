import { useTheme } from '@material-ui/core';
import React from 'react';

export interface TimeGridProps {
    gridElementHeight: number;
    width: number;
}

export default function TimeGrid(props: TimeGridProps) {
    const elementsAmount = 24;
    const theme = useTheme();

    function createGrid() {
        let array = [];

        for (let i = 1; i < elementsAmount; i++) {
            array.push(
                <div key={i} style={{ height: props.gridElementHeight }}>
                    <div>{i}:00</div>
                </div>,
            );
        }

        return array;
    }

    return (
        <div
            style={{
                minWidth: props.width,
                marginTop: props.gridElementHeight - 8,
                backgroundColor: theme.palette.background.paper,
                textAlign: 'center',
            }}
        >
            {createGrid()}
        </div>
    );
}
