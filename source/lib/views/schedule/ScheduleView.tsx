import React from 'react';
import { EventStorage } from '../../core/components/eventStorage/CalendarEventStorage';
import ScheduleGrid from './scheduleGrid/ScheduleGrid';

export interface ScheduleViewProps {
    focusedDate: Date;
    eventStorage: EventStorage;
}

export default function ScheduleView(props: ScheduleViewProps) {
    return <ScheduleGrid {...props} />;
}
