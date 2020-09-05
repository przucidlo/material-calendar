import { findIndex } from 'lodash';
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

/**
 * Hook responsible for loading data into EventStorage.
 *
 * Returns interface which user can use to manipulate
 * the storage.
 */
export default function useCalendarEventStorage(props: UseCalendarEventStorageProps) {
    const calendarContext: CalendarContextStructure = props.calendarContext;
    const viewContext: ViewContextStructure = props.viewContext;

    /**
     * Do lazy loading of data everytime highlightDate or view changes.
     */
    useEffect(() => {
        lazyLoadData();
    }, [viewContext.highlightDate, viewContext.view]);

    /**
     *  Lazy loads data based on DataRange provided by view.
     *
     *  Doesn't load data If it was loaded before,
     *  for that please use forceReload function
     *  returned by this hook.
     */
    async function lazyLoadData(): Promise<void> {
        if (viewContext.view) {
            // Gets date range relative to highlightDate
            const dateRange = viewContext.view.getDateRange(viewContext.highlightDate);

            if (!isDataPresentInStorage(dateRange.from, dateRange.till)) {
                const requestedData: CalendarEvent[] = await props.onDataRequest(dateRange.from, dateRange.till);

                /*
                 *  If data wasn't loaded before, this function will
                 *  begin loading by prefilling required range with
                 *  empty arrays to indicate that this specific range
                 *  was loaded before.
                 */
                const preFilledStorage = EventStorageFiller.preFillStorage(
                    dateRange.from,
                    dateRange.till,
                    calendarContext.eventStorage,
                );

                /*
                 * After prefilling data with empty arrays, storage is
                 * ready to be filled with data provided by user.
                 *
                 * Spread operator is used due to react-context
                 * not noticing the change If we just pass modified
                 * eventStorage
                 */
                calendarContext.setEventStorage({ ...fillStorageWithEvents(requestedData, preFilledStorage) });
            }
        }
    }

    /**
     * Fills copy of EventStorage with provided events and returns it.
     *
     * @param calendarEvents Events that will be inserted to EventStorage
     * @param eventStorage EventStorage that will be copied to insert events into it.
     */
    function fillStorageWithEvents(calendarEvents: CalendarEvent[], eventStorage: EventStorage): EventStorage {
        // Make copy of provided EventStorage
        let eventStorageCopy = eventStorage;

        // Iterate over provided events and insert them into storage.
        for (let event of calendarEvents) {
            const year = event.startedAt.getFullYear();
            const month = event.startedAt.getMonth();
            const day = event.startedAt.getDate();

            eventStorageCopy[year] = {
                // Reassign any previously loaded months
                ...eventStorageCopy[year],
                [month]: {
                    // Reassign days that were loaded before.
                    ...eventStorageCopy[year]?.[month],
                    [day]: [...pushEventIntoEventArray(eventStorageCopy[year]?.[month]?.[day], event)],
                },
            };
        }

        return eventStorageCopy;
    }

    /**
     * Inserts or Updates the CalendarEvent array with provided event
     * and sorts events by event.startedAt property.
     *
     * @param eventArray
     * @param event
     */
    function pushEventIntoEventArray(eventArray: CalendarEvent[], event: CalendarEvent): CalendarEvent[] {
        const arrayEventIndex = findIndex(eventArray, (element) => element.id === event.id);

        // Checking If same event already exists inside of the array.
        if (arrayEventIndex !== -1) {
            eventArray[arrayEventIndex] = event;
        } else {
            eventArray.push(event);
        }

        return sortCalendarEventArrayByDate(eventArray);
    }

    /**
     * Sorts CalendarEvent ascending by startedAt property.
     * @param eventArray
     */
    function sortCalendarEventArrayByDate(eventArray: CalendarEvent[]): CalendarEvent[] {
        return eventArray.sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());
    }

    /**
     * Checks If any data was loaded before in specified range.
     * @param from
     * @param till
     */
    function isDataPresentInStorage(from: Date, till: Date): boolean {
        return EventStoragePresenceHelper.isDataPresent(from, till, calendarContext.eventStorage);
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
