import React from 'react';
import { PopoverState } from './usePopover';

export default function togglePopover(popoverState: PopoverState): any {
    return {
        onClick: (event: React.MouseEvent<any>) => popoverState.openPopover(event),
    };
}
