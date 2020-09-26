import React, { ReactElement, useContext, useMemo } from 'react';
import { ViewContext } from '../../../common/contexts/ViewContext';

export default function ViewController() {
    const viewContext = useContext(ViewContext);

    function getView(): ReactElement {
        if (viewContext.view) {
            return React.createElement(viewContext.view.component);
        }
        return <div></div>;
    }

    // Re-render only if another view was selected by user.
    return <div>{useMemo(() => getView(), [viewContext.view])}</div>;
}

// ViewController.whyDidYouRender = true;

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
