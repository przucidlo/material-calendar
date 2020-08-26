import React, { ReactNode } from 'react';
import MonthEventListHeader from './MonthEventListHeader';

export interface MonthEventListProps {
    date: Date;
    eventsComponent: ReactNode[];
}

export default function MonthEventList(props: MonthEventListProps) {
    return (
        <div style={{ padding: 16, minWidth: 300 }}>
            <MonthEventListHeader date={props.date} />
            {props.eventsComponent}
        </div>
    );
}
