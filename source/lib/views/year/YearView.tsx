import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import togglePopover from '../../common/hooks/popover/togglePopover';
import usePopover from '../../common/hooks/popover/usePopover';
import YearGrid from './components/grid/YearGrid';
import YearEventPopover from './components/popover/YearEventPopover';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
    },
}));

export default function YearView(): ReactElement {
    const eventPopover = usePopover();
    const classes = useStyles();

    function openPopover(event: React.MouseEvent<any>): void {
        togglePopover(eventPopover).onClick(event);
    }

    return (
        <div className={classes.root}>
            <YearEventPopover popoverState={eventPopover} />
            <YearGrid onDateAvatarClick={openPopover} />
        </div>
    );
}

// YearView.whyDidYouRender = true;
