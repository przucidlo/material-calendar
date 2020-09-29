import { EventPopoverContent } from '../../api/EventPopoverContent';
import togglePopover from '../popover/togglePopover';
import { PopoverState } from '../popover/usePopover';

export default function toggleEventPopover(popoverState: PopoverState, eventPopover: EventPopoverContent) {
    if (!eventPopover) {
        return {};
    }
    return togglePopover(popoverState);
}
