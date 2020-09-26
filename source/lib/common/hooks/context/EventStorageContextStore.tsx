import { useState } from 'react';
import { EventStorage } from '../../api/EventStorage';
import { DEFAULT_EVENT_STORAGE_CONTEXT } from '../../contexts/EventStorageContext';

export const EventStorageContextStore = () => {
    const [eventStorage, setEventStorage] = useState<EventStorage>(DEFAULT_EVENT_STORAGE_CONTEXT.eventStorage);

    return { eventStorage, setEventStorage };
};

export default EventStorageContextStore;
