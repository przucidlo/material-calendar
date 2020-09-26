import { makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement, useMemo } from 'react';
import useLocale from '../../../../hooks/locale/useLocale';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, auto)',
        gridRowGap: '4px',
    },
    headerItem: {
        width: 24,
        height: 24,
        textAlign: 'center',
        color: theme.palette.grey[600],
    },
}));

function CompactMonthGridHeader(): ReactElement {
    const locale = useLocale();
    const classes = useStyles();

    function getDayLetters() {
        return locale.days.map((day, i) => (
            <div className={classes.headerItem} key={i}>
                <Typography variant="caption">{day.charAt(0).toLocaleUpperCase()}</Typography>
            </div>
        ));
    }

    return <div className={classes.container}>{useMemo(() => getDayLetters(), [])}</div>;
}

export default CompactMonthGridHeader;
