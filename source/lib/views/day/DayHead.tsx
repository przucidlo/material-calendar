import { Avatar, Typography, useTheme } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { ReactElement } from 'react';

interface Props {
    highlightDate: Date;
    center?: boolean;
    intendHoursGap?: boolean;
}

function DayHead(props: Props): ReactElement {
    const days = ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'];
    const theme = useTheme();

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                width: '100%',
                backgroundColor: 'white',
                borderBottom: '1px solid',
                borderBottomColor: theme.palette.grey[300],
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: props.center ? 'center' : 'normal',
                    height: '100%',
                    paddingTop: theme.spacing(2),
                    paddingBottom: theme.spacing(2),
                }}
            >
                <div style={{ width: 96 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="primary" variant="body1">
                            {days[props.highlightDate.getDay()].toLocaleUpperCase()}
                        </Typography>
                        <Avatar
                            style={{
                                backgroundColor: isToday(props.highlightDate)
                                    ? theme.palette.primary.main
                                    : theme.palette.grey[500],
                            }}
                        >
                            {props.highlightDate.getDate()}
                        </Avatar>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayHead;
