import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';
import useLocale from '../../hooks/locale/useLocale';
import CompactMonthGrid from './components/grid/CompactMonthGrid';
import CompactMonthGridHeader from './components/grid/CompactMonthGridHeader';

export interface CompactMonthProps {
    month: Date;
}

const useStyles = makeStyles((theme) => ({
    content: {
        minWidth: 224,
        minHeight: 236,
        maxHeight: 236,
        padding: 8,
    },
}));

export default function CompactMonth(props: CompactMonthProps): ReactElement {
    const classes = useStyles();
    const locale = useLocale();

    return (
        <Box display="flex" justifyContent="center">
            <div className={classes.content}>
                <Typography variant="subtitle1" gutterBottom>
                    {locale.months[props.month.getMonth()]}
                </Typography>
                <CompactMonthGridHeader />
                <CompactMonthGrid month={props.month} />
            </div>
        </Box>
    );
}
