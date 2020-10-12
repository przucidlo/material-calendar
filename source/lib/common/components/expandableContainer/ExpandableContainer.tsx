import floor from 'lodash/floor';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

export interface ExpandableContainerProps {
    /**
     * Elements that you want to storage inside the container.
     */
    elements: ReactNode[];

    /**
     * Height of the single element that will be used to calculate
     * how many elements can be displayed inside the container.
     */
    elementHeight: number;

    /**
     * Element that will be renderered as the last one in the container.
     *
     * Always present even if there won't be enough space to display
     * given elements
     *
     * Must be the same size as provided elementHeight.
     */
    expandMoreComponent?: (remainingElements: number) => ReactNode;
}

/**
 * TODO: Write explanation of this UI element, since it's meant to be reusable.
 */
export default function ExpandableContainer(props: ExpandableContainerProps) {
    const [displayedElementsNumber, setDisplayedElementsNumber] = useState(0);
    const rootElementRef = useRef<HTMLDivElement>(null);

    /**
     * Called when ref to rootElement is assigned.
     * Calls updateContainer and registers eventListener
     * that calls updateContainer everytime window size changes.
     */
    useEffect(() => {
        if (rootElementRef.current) {
            updateContainer();

            window.addEventListener('resize', updateContainer);

            return () => {
                window.removeEventListener('resize', updateContainer);
            };
        }
    }, [rootElementRef]);

    /**
     * Calculates how many elements can be displayed in container
     * without overflowing it.
     *
     * TODO: Possible optimalization by usage of timer to
     * reduce number of calls made to the update function.
     */
    function updateContainer() {
        let availableHeight = rootElementRef.current.getBoundingClientRect().height;

        setDisplayedElementsNumber(floor(availableHeight / props.elementHeight));
    }

    function renderElements(amount: number) {
        if (props.elements.length > amount) {
            return renderSlicedElementsArray(amount);
        }
        return props.elements;
    }

    function renderSlicedElementsArray(amount: number) {
        let slicedArray = props.elements.slice(0, amount);

        // Swapping last element with expandMore component If one was provided.
        if (props.expandMoreComponent) {
            // Decreasing amount by one since expandMoreComponent should not be counted as remaining elements.
            slicedArray[slicedArray.length - 1] = props.expandMoreComponent(props.elements.length - (amount - 1));
        }

        return slicedArray;
    }

    return (
        // This piece of code might seem dumb but the thing is, it works.
        //
        // To not affect initial size of the container, we wrap the content
        // in div that has 0 height.
        // So measurements are not affected by renderered elements and we always
        // get the "true" height of the root component.
        <div style={{ height: '100%' }} ref={rootElementRef}>
            <div style={{ height: 0 }}>{renderElements(displayedElementsNumber)}</div>
        </div>
    );
}
