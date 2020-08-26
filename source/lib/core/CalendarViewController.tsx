import { Fade } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { SelectInputValueType } from '../common/components/selectInput/SelectInput';
import CALENDAR_VIEWS from './CalendarViews';
import { DateChangeAction } from './components/actions/DateChangeAction';
import { EventStorage } from './components/eventStorage/CalendarEventStorage';
import useScrollLock, { ScrollEvent } from './components/scrollLock/useScrollLock';

export interface CalendarViewControllerProps {
    focusedDate: Date;
    selectedView: null | ReactElement;
    selectedViewOption: SelectInputValueType;
    eventStorage: EventStorage;

    setSelectedView: (view: ReactElement) => void;
    onDateChange: (dateChangeAction: DateChangeAction) => void;
}

export default function CalendarViewController(props: CalendarViewControllerProps) {
    // State of Fade animation, if set to false then children component will Fade out
    const [viewTransition, setViewTransition] = useState(false);

    // ScrollLock hook use to handle change of date in month view by usage of scrollwheel
    // FIXME: lookup handleDateChangeByWheel function for more details.
    const scrollLock = useScrollLock({
        lockDuration: 500,
        onScrollEvent: handleDateChangeByWheel,
    });

    // Currently displayed view selected by user.
    // By default set to Day.
    const SelectedView = CALENDAR_VIEWS[props.selectedViewOption as string]
        ? CALENDAR_VIEWS[props.selectedViewOption as string]
        : CALENDAR_VIEWS['Day'];

    /**
     *  Fade animation chain.
     */

    useEffect(() => {
        // Fade out currently displayed view.
        // setViewTransition(false);
    }, [props.selectedViewOption, props.focusedDate]);

    useEffect(() => {
        if (!viewTransition) {
            // Fade in currently displayed view.
            setTimeout(() => {
                setViewTransition(true);
            }, 0);
        }
    }, [viewTransition]);

    /**
     * When selectedView is set to month, we allow user to change
     * displayed month by usage of scrollwheel.
     *
     * FIXME: onWheel event causes re-render everytime it occurs,
     *        which degrades the perfomance
     *        08.06.2020 - preventDefault doesn't work, future research is required
     */
    function handleDateChangeByWheel(scrollEvent: ScrollEvent) {
        if (props.selectedViewOption === 'Month') {
            if (scrollEvent === ScrollEvent.UP) {
                props.onDateChange(DateChangeAction.BACKWARD);
            } else {
                props.onDateChange(DateChangeAction.FORWARD);
            }
        }
    }

    return (
        <Fade in={viewTransition} timeout={{ exit: 250, enter: 250 }}>
            <div>
                {/*
                    Only display the SelectedView when viewTransition is equal to true.
                    Otherwise SelectedView will be re-rendered 3 times during the transition.
                    Which can cause some performance issues if views will get more "heavy".
                */}
                {viewTransition ? <SelectedView {...props} /> : <div></div>}
            </div>
        </Fade>
    );
}
