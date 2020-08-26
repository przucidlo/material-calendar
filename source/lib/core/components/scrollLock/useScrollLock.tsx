import React, { useEffect, useState } from 'react';

export enum ScrollEvent {
    UP,
    DOWN,
}

export interface UseScrollLockProps {
    lockDuration: number;

    onScrollEvent: (event: ScrollEvent) => void;
}

/**
 * Hook which locks the scroll and sends callback with scroll move direction.
 *
 * Returns a method that accepts WheelEvent as parameter
 * and handles all the logic behind the hook.
 * @param props
 */
export default function useScrollLock(props: UseScrollLockProps): (event: React.WheelEvent<HTMLDivElement>) => void {
    const [scrollLocked, setScrollLocked] = useState(false);

    // Unlocking the scroll after given lockDuration.
    useEffect(() => {
        if (scrollLocked) {
            setTimeout(() => {
                setScrollLocked(false);
            }, props.lockDuration);
        }
    }, [scrollLocked]);

    function handleWheelEvent(event: React.WheelEvent<HTMLDivElement>) {
        if (!scrollLocked) {
            if (event.deltaY < 0) {
                props.onScrollEvent(ScrollEvent.UP);
            } else {
                props.onScrollEvent(ScrollEvent.DOWN);
            }
            setScrollLocked(true);
        }
    }

    return handleWheelEvent;
}
