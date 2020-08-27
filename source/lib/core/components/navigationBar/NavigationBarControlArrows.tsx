import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { ReactElement } from 'react';
import { DateChangeAction } from '../../../common/api/DateChangeAction';

interface NavigationBarControlArrowsProps {
    onChangeDate: (dateChangeAction: DateChangeAction) => void;
}

function NavigationBarControlArrows(props: NavigationBarControlArrowsProps): ReactElement {
    return (
        <div style={{ display: 'inline', marginLeft: '8px', marginRight: '8px' }}>
            <IconButton
                size="small"
                onClick={() => {
                    props.onChangeDate(DateChangeAction.BACKWARD);
                }}
            >
                <ChevronLeftIcon />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => {
                    props.onChangeDate(DateChangeAction.FORWARD);
                }}
            >
                <ChevronRightIcon />
            </IconButton>
        </div>
    );
}

export default NavigationBarControlArrows;
