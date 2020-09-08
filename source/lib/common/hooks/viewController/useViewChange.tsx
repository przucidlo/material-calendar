import React, { ReactNode, useContext } from 'react';
import { CalendarView } from '../../api/CalendarView';
import { CalendarContext } from '../../contexts/CalendarContext';
import { ViewContext } from '../../contexts/ViewContext';

export interface UseViewChange {
    changeView: (view: ReactNode) => void;
}

export default function useViewChange() {
    const calendarContext = useContext(CalendarContext);
    const viewContext = useContext(ViewContext);

    function findCalendarView(component: React.FunctionComponent): CalendarView | null {
        for (let calendarView of calendarContext.views) {
            if (component == calendarView.component) {
                return calendarView;
            }
        }
        return null;
    }

    return new (class implements UseViewChange {
        public changeView(view: React.FunctionComponent, highlightDate?: Date): void {
            const calendarView = findCalendarView(view);

            if (calendarView) {
                viewContext.setView(calendarView);

                if (highlightDate) {
                    viewContext.setHighlightDate(highlightDate);
                }
            } else {
                console.warn("View change failed, provided view doesn't exist.");
            }
        }
    })();
}
