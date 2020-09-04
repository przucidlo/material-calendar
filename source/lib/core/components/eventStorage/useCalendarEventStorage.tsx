import { useEffect } from 'react';
import CalendarEvent from '../../../common/api/CalendarEvent';
import { EventStorage } from '../../../common/api/EventStorage';
import { CalendarContextStructure } from '../../../common/contexts/CalendarContext';
import ViewContextStructure from '../../../common/contexts/ViewContext';
import EventStorageFiller from './EventStorageFiller';
import EventStoragePresenceHelper from './EventStoragePresenceHelper';

export interface UseCalendarEventStorageProps {
    onDataRequest: (from: Date, till: Date) => Promise<CalendarEvent[]>;

    calendarContext: CalendarContextStructure;
    viewContext: ViewContextStructure;
}

export default function useCalendarEventStorage(props: UseCalendarEventStorageProps) {
    const calendarContext: CalendarContextStructure = props.calendarContext;
    const viewContext: ViewContextStructure = props.viewContext;

    useEffect(() => {
        loadData();
    }, [viewContext.highlightDate, viewContext.view]);

    async function loadData(): Promise<void> {
        if (viewContext.view) {
            const dateRange = viewContext.view.getDateRange(viewContext.highlightDate);

            if (!isDataPresentInStorage(dateRange.from, dateRange.till)) {
                const requestedData: CalendarEvent[] = await props.onDataRequest(dateRange.from, dateRange.till);
                let eventStorageCopy: EventStorage = calendarContext.eventStorage;

                const preFilledStorage = EventStorageFiller.preFillStorage(
                    dateRange.from,
                    dateRange.till,
                    eventStorageCopy,
                );

                calendarContext.setEventStorage(sortEvents(requestedData, preFilledStorage));
            }
        }
    }

    function isDataPresentInStorage(from: Date, till: Date): boolean {
        return EventStoragePresenceHelper.isDataPresent(from, till, calendarContext.eventStorage);
    }

    function sortEvents(calendarEvents: CalendarEvent[], eventStorage: EventStorage): EventStorage {
        for (let event of calendarEvents) {
            const year = event.startedAt.getFullYear();
            const month = event.startedAt.getMonth();
            const day = event.startedAt.getDate();

            eventStorage[year] = {
                ...eventStorage[year],
                [month]: {
                    ...eventStorage[year]?.[month],
                    [day]: [
                        ...(eventStorage[year]?.[month]?.[day] === undefined ? [] : eventStorage[year]?.[month]?.[day]),
                        event,
                    ],
                },
            };
        }

        return eventStorage;
    }

    return new (class {
        /**
         * Forces EventStorage to request data once again.
         */
        public async forceReload(calendarEvent?: []): Promise<void> {
            if (calendarEvent) {
            }
        }
    })();
}
