import React from 'react';
import { EventStorage } from '../api/EventStorage';

export interface EventStorageContextStructure {
    eventStorage: EventStorage;

    setEventStorage: (eventStorage: EventStorage) => void;
}

export const DEFAULT_EVENT_STORAGE_CONTEXT: EventStorageContextStructure = {
    eventStorage: {},

    setEventStorage: () => {},
};

export const EventStorageContext = React.createContext<EventStorageContextStructure>(DEFAULT_EVENT_STORAGE_CONTEXT);
