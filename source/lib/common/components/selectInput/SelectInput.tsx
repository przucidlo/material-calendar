import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';

export type SelectInputValueType = string | number | string[];

export interface SelectInputOptions {
    [name: string]: SelectInputValueType;
}

interface Props {
    label?: string;
    options: SelectInputOptions;
    fullWidth?: boolean;
    defaultFirstItem?: boolean;
    style?: CSSProperties;
    variant?: 'filled' | 'outlined' | 'standard';
    labelWidth?: number;
    autoWidth?: boolean;
    displayNone?: boolean;

    onInputChange?: (value: SelectInputValueType) => void;
}

function SelectInput(props: Props) {
    const [option, setOption] = useState('' as SelectInputValueType);

    /**
     * If setDefaultAsFirstItem flag is set, then this method does exactly that.
     */
    useEffect(() => {
        if (props.defaultFirstItem) {
            const optionsKeys = Object.keys(props.options);

            if (optionsKeys.length > 0) {
                setOption(props.options[optionsKeys[0]]);
            }
        }
    }, []);

    /**
     * Calls onChange prop each time option value changes.
     */
    useEffect(() => {
        if (option !== '') {
            if (props.onInputChange) {
                for (let key of Object.keys(props.options)) {
                    if (props.options[key] === option) {
                        props.onInputChange(key);
                    }
                }
            }
        }
    }, [option]);

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        setOption(event.target.value as SelectInputValueType);
    }

    function renderMenuOptions(): ReactElement[] {
        let menuOptions: ReactElement[] = [];

        for (let selectInputOption of Object.keys(props.options)) {
            menuOptions.push(
                <MenuItem key={selectInputOption} value={props.options[selectInputOption]}>
                    {props.options[selectInputOption]}
                </MenuItem>,
            );
        }

        return menuOptions;
    }

    return (
        <FormControl>
            <Select value={option} margin="dense" onChange={handleChange} variant="outlined">
                {props.displayNone ? (
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                ) : null}
                {renderMenuOptions()}
            </Select>
        </FormControl>
    );
}

export default SelectInput;
