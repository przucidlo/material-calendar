import CalendarEvent from './CalendarEvent';

export interface EventStorage {
    [year: number]: {
        [month: number]: {
            [day: number]: CalendarEvent[];
        };
    };
}
