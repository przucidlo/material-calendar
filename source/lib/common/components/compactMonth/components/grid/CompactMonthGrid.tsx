import { makeStyles } from '@material-ui/core';
import { isSameMonth } from 'date-fns';
import React, { Fragment, ReactElement } from 'react';
import DateUtils from '../../../../tools/DateUtils';
import DateAvatar from '../../../dateAvatar/DateAvatar';

export interface CompactMonthGridProps {
    /**
     * Date set to any day inside of a month.
     */
    month: Date;

    onDateAvatarClick?: (event: React.MouseEvent<any>) => void;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, auto)',
        gridRowGap: '4px',
    },
}));

export default function CompactMonthGrid(props: CompactMonthGridProps): ReactElement {
    const classes = useStyles();

    function createGrid(): ReactElement {
        const gridDays = DateUtils.getWeeksDaysOfMonth(props.month);
        let columns: ReactElement[] = [];

        gridDays.forEach((day) => {
            columns.push(createGridElement(day));
        });

        return (
            <div className={classes.container} key={'compact-grid-container'}>
                {columns}
            </div>
        );
    }

    function createGridElement(day: Date): ReactElement {
        return (
            <Fragment key={['compact-grid-element', day.getMonth(), day.getDate()].join('-')}>
                <DateAvatar
                    date={day}
                    size="small"
                    highlightOnHover
                    grayOutText={!isSameMonth(props.month, day)}
                    onClick={props.onDateAvatarClick}
                />
            </Fragment>
        );
    }

    return <Fragment>{createGrid()}</Fragment>;
}
