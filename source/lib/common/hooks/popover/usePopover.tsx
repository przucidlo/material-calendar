import React, { useState } from 'react';

export interface PopoverState {
    openPopover: (event: React.MouseEvent<any>) => void;
    closePopover: () => void;

    isOpen: () => boolean;
    getAnchorElement: () => any;
}

/**
 *  Hook created to manage the state of popover component.
 */
export default function usePopover() {
    const [popoverAnchorElement, setPopoverAnchorElement] = useState<React.MouseEvent<any> | null>(null);

    return new (class implements PopoverState {
        public openPopover(event: React.MouseEvent<any>) {
            setPopoverAnchorElement(event.currentTarget);
        }

        public closePopover() {
            setPopoverAnchorElement(null);
        }

        public isOpen() {
            return Boolean(popoverAnchorElement);
        }

        public getAnchorElement() {
            return popoverAnchorElement;
        }
    })();
}
