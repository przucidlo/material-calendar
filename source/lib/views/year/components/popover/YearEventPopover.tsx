import { makeStyles, Popover } from '@material-ui/core';
import React, { ReactElement, useContext } from 'react';
import DateEvents from '../../../../common/components/dateEvents/DateEvents';
import { EventStorageContext } from '../../../../common/contexts/EventStorageContext';
import { ViewContext } from '../../../../common/contexts/ViewContext';
import bindPopover from '../../../../common/hooks/popover/bindPopover';
import { PopoverState } from '../../../../common/hooks/popover/usePopover';

interface YearEventPopoverProps {
    popoverState: PopoverState;
}

const useStyles = makeStyles((theme) => ({
    popover: {
        width: 224,
    },
}));

export default function YearEventPopover(props: YearEventPopoverProps): ReactElement {
    const eventStorageContext = useContext(EventStorageContext);
    const viewContext = useContext(ViewContext);
    const classes = useStyles();

    function getPopoverContent(): ReactElement {
        return (
            <DateEvents
                date={viewContext.highlightDate}
                onClose={props.popoverState.closePopover}
                eventStorage={eventStorageContext.eventStorage}
            />
        );
    }

    return (
        <Popover
            {...bindPopover(props.popoverState)}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div className={classes.popover}>{getPopoverContent()}</div>
        </Popover>
    );
}
