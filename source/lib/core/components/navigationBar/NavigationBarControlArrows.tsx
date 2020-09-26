import { IconButton, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { ReactElement } from 'react';
import { DateChangeAction } from '../../../common/api/DateChangeAction';

interface NavigationBarControlArrowsProps {
    onChangeDate: (dateChangeAction: DateChangeAction) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline',
        marginLeft: '8px',
        marginRight: '8px',
    },
}));

function NavigationBarControlArrows(props: NavigationBarControlArrowsProps): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
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
