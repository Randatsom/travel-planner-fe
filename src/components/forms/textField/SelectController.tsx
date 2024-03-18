import React, { useCallback, WheelEventHandler } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface SelectControllerProps {
  name: string;
  label: string;
  options: Option[];
  multiple?: boolean;
}

const SelectController = ({
  name,
  label,
  options,
  control,
  multiple,
}: SelectControllerProps) => {
  const handleBlurOnWheel: WheelEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target instanceof HTMLElement) {
        event.target.blur();
      }
    },
    [],
  );

  return (
    <Controller
      control={control}
      defaultValue={multiple ? [] : ""}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            onWheel={handleBlurOnWheel}
            label={label}
            multiple={multiple}
            renderValue={
              multiple
                ? (selected) =>
                    Array.isArray(selected)
                      ? selected
                          .map(
                            (value) =>
                              options.find((option) => option.value === value)
                                ?.label,
                          )
                          .filter((label) => label)
                          .join(", ")
                      : selected
                : undefined
            }
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {multiple && (
                  <Checkbox
                    checked={
                      (field.value as string[]).indexOf(option.value) > -1
                    }
                  />
                )}
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectController;
