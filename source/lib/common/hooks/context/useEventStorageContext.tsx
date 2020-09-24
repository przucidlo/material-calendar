import { useState } from 'react';
import { EventStorage } from '../../api/EventStorage';
import { DEFAULT_EVENT_STORAGE_CONTEXT, EventStorageContextStructure } from '../../contexts/EventStorageContext';

export default function useEventStorageContext(): EventStorageContextStructure {
    const [eventStorage, setEventStorage] = useState<EventStorage>(DEFAULT_EVENT_STORAGE_CONTEXT.eventStorage);

    return { eventStorage, setEventStorage };
}
