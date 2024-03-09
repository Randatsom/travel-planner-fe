import React, { useCallback, WheelEventHandler } from "react";
import { TextField } from "@mui/material";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { TextFieldControllerProps } from "components/forms/textField/types";

const TextFieldController = <TFieldValues extends FieldValues>({
  name,
  control,
  helperText,
  readOnly = false,
  numericOnly = false,
  ...otherProps
}: TextFieldControllerProps<TFieldValues>) => {
  const handleBlurOnWheel: WheelEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target instanceof HTMLElement) {
        event.target.blur();
      }
    },
    [],
  );
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (numericOnly && !/[\d.]/.test(event.key)) {
          event.preventDefault();
        }
      },
      [numericOnly],
    );

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...otherProps}
          {...field}
          {...(otherProps.type === "number" && { onWheel: handleBlurOnWheel })}
          onKeyPress={handleKeyPress}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? helperText}
          inputProps={{ readOnly, autoComplete: "off" }}
        />
      )}
    />
  );
};

export default TextFieldController;
