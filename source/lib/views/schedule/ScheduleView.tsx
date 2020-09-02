import React from 'react';
import CalendarViewProps from '../../common/api/CalendarViewProps';
import ScheduleGrid from './scheduleGrid/ScheduleGrid';

export interface ScheduleViewProps extends CalendarViewProps {}

export default function ScheduleView(props: ScheduleViewProps) {
    return <ScheduleGrid />;
}
