import { Fade } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CalendarState from '../calendarState/CalendarState';

export interface ViewControllerProps {
    calendarState: CalendarState;
}

export default function ViewController(props: ViewControllerProps) {
    const calendarState: CalendarState = props.calendarState;

    // State of Fade animation, if set to false then children component will Fade out
    const [viewTransition, setViewTransition] = useState(false);

    /**
     *  Fade animation chain.
     */

    useEffect(() => {
        // Fade out currently displayed view.
        // setViewTransition(false);
    }, [calendarState.getHighlightDate()]);

    useEffect(() => {
        if (!viewTransition) {
            // Fade in currently displayed view.
            setTimeout(() => {
                setViewTransition(true);
            }, 0);
        }
    }, [viewTransition]);

    return (
        <Fade in={viewTransition} timeout={{ exit: 250, enter: 250 }}>
            <div>
                {/*
                    Only display the SelectedView when viewTransition is equal to true.
                    Otherwise SelectedView will be re-rendered 3 times during the transition.
                    Which can cause some performance issues if views will get more "heavy".
                */}
                {viewTransition ? calendarState.getCurrentView().component({ calendarState }) : <div></div>}
            </div>
        </Fade>
    );
}

// /**
//  * When selectedView is set to month, we allow user to change
//  * displayed month by usage of scrollwheel.
//  *
//  * FIXME: onWheel event causes re-render everytime it occurs,
//  *        which degrades the perfomance
//  *        08.06.2020 - preventDefault doesn't work, future research is required
//  */
// function handleDateChangeByWheel(scrollEvent: ScrollEvent) {
//     if (props.selectedViewOption === 'Month') {
//         if (scrollEvent === ScrollEvent.UP) {
//             props.onDateChange(DateChangeAction.BACKWARD);
//         } else {
//             props.onDateChange(DateChangeAction.FORWARD);
//         }
//     }
// }

// // ScrollLock hook use to handle change of date in month view by usage of scrollwheel
// // FIXME: lookup handleDateChangeByWheel function for more details.
// const scrollLock = useScrollLock({
//     lockDuration: 500,
//     onScrollEvent: handleDateChangeByWheel,
// });
