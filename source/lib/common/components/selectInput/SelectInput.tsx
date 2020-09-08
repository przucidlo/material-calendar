import { FormControl, MenuItem, Select } from '@material-ui/core';
import { find } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';

export type SelectInputValue = string | number | string[];

export interface SelectOption<T> {
    id?: number;

    name: SelectInputValue;

    source: T;
}

interface SelectInputProps<T> {
    options: SelectOption<T>[];
    variant?: 'filled' | 'outlined' | 'standard';
    overrideOption?: T;

    onInputChange?: (value: T) => void;
}

function SelectInput<T>(props: SelectInputProps<T>) {
    const [options, setOptions] = useState<SelectOption<T>[]>([]);
    const [optionId, setOptionId] = useState(0);

    useEffect(() => {
        assignItemsId();
    }, [props.options]);

    useEffect(() => {
        if (props.overrideOption) {
            const option = getOptionBySource(props.overrideOption);

            if (option && option.id !== optionId) {
                setOptionId(option.id);
            }
        }
    }, [props.overrideOption]);

    function assignItemsId() {
        setOptions(
            props.options.map((inputItem, index) => {
                inputItem.id = index;

                return inputItem;
            }),
        );
    }

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        const id: number = event.target.value as number;

        setOptionId(id);

        if (props.onInputChange) {
            const selectInputValue = find(options, { id: id });

            if (selectInputValue) {
                props.onInputChange(selectInputValue.source);
            }
        }
    }

    function getOptionBySource<T>(source: T): SelectOption<T> | undefined {
        const option = find(options, { source: source });

        if (option) {
            return (option as unknown) as SelectOption<T>;
        }
        return undefined;
    }

    function renderMenuOptions(): ReactElement[] {
        return options.map((inputItem) => (
            <MenuItem key={inputItem.id} value={inputItem.id}>
                {inputItem.name}
            </MenuItem>
        ));
    }

    return (
        <FormControl>
            <Select value={optionId} margin="dense" onChange={handleChange} variant={props.variant}>
                {renderMenuOptions()}
            </Select>
        </FormControl>
    );
}

export default SelectInput;
