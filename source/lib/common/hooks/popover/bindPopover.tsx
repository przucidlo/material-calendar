import { PopoverState } from './usePopover';

export default function bindPopover(popoverState: PopoverState): any {
    return {
        onClose: popoverState.closePopover,
        anchorEl: popoverState.getAnchorElement(),
        open: popoverState.isOpen(),
    };
}
