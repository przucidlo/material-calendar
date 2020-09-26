import { makeStyles, Typography } from '@material-ui/core';
import { isToday } from 'date-fns';
import React, { memo, ReactElement } from 'react';

export interface DateAvatarProps {
    /**
     * Number of the day that will be rendered inside of the avatar.
     *
     * //TODO: Add support for number type.
     */
    date: Date;

    /**
     * Highlights component when mouse hovers over it.
     *
     * @default false
     */
    highlightOnHover?: boolean;

    /**
     * If set to true, text color will be set to gray.
     *
     * @default false
     */
    grayOutText?: boolean;

    /**
     * If set to true, text will be rendered using
     * div instead of typography component.
     *
     * @default false
     */
    plainText?: boolean;

    /**
     * Size variant.
     *
     * @default 'large'
     */
    size?: 'small' | 'large';

    /**
     * Triggered whenever user clicks on the component.
     */
    onClick?: (event: React.MouseEvent<any>) => void;
}

const useStyles = makeStyles((theme) => ({
    common: {
        textAlign: 'center',
        borderRadius: '50%',
        color: theme.palette.text.primary,
    },
    largeVariant: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    smallVariant: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    backgroundCommon: {
        backgroundColor: 'inherit',
    },
    backgroundToday: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
    },
    hoverCommon: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    hoverToday: {
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    textSmall: {
        lineHeight: 1.7,
    },
    textLarge: {
        lineHeight: 2.4,
    },
    textColorGrey: {
        color: theme.palette.grey[500],
    },
}));

/**
 * Component based on Avatar design of Material-UI.
 *
 * Created due default Avatar component being too heavy to render in YearView,
 * which degraded the performance significantly.
 *
 * @privateRemarks
 * Remember to keep this component as lightweight as you can.
 */
function DateAvatar(props: DateAvatarProps): ReactElement {
    const classes = useStyles();

    const rootClasses: string = [classes.common, getRootVariant(), getBackgroundVariant(), getHoverVariant()].join(' ');
    const textClasses: string = [getTextSize(), getTextColor()].join(' ');

    /*
     * Text styling functions
     */

    function getTextVariant(): 'h6' | 'subtitle2' {
        return props.size && props.size === 'small' ? 'subtitle2' : 'h6';
    }

    function getTextSize(): string {
        return props.size && props.size === 'small' ? classes.textSmall : classes.textLarge;
    }

    function getTextColor(): string {
        if (props.grayOutText) {
            return classes.textColorGrey;
        }
        return '';
    }

    function getTypographyText(): ReactElement {
        return (
            <Typography variant={getTextVariant()} className={textClasses}>
                {props.date.getDate()}
            </Typography>
        );
    }

    function getPlainText(): ReactElement {
        return <span className={textClasses + ' MuiTypography-' + getTextVariant()}>{props.date.getDate()}</span>;
    }

    function getText(): ReactElement {
        if (props.plainText) {
            return getPlainText();
        }
        return getTypographyText();
    }

    /*
     * Component styling functions.
     */

    function getRootVariant(): string {
        return props.size && props.size === 'small' ? classes.smallVariant : classes.largeVariant;
    }

    function getHoverVariant(): string {
        if (props.highlightOnHover) {
            return isToday(props.date) ? classes.hoverToday : classes.hoverCommon;
        }

        return '';
    }

    function getBackgroundVariant(): string {
        return isToday(props.date) ? classes.backgroundToday : classes.backgroundCommon;
    }

    /*
     *  Events handling functions.
     */

    function forwardOnClick(event: React.MouseEvent<any>): void {
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div className={rootClasses} onClick={forwardOnClick}>
            {getText()}
        </div>
    );
}

export default memo(DateAvatar);
