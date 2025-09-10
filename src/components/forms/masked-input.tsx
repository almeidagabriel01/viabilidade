"use client";

import React from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  placeholder?: string;
  className?: string;
  onAccept?: (value: string) => void;
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, className, onAccept, onChange, ...props }, ref) => {
    const { placeholder, value, onBlur, name, disabled } = props;
    
    return (
      <IMaskInput
        mask={mask}
        lazy={false}
        placeholderChar="_"
        placeholder={placeholder}
        value={value as string}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        onAccept={(value) => {
          onAccept?.(value);
          // Simular evento onChange para compatibilidade com react-hook-form
          if (onChange) {
            const syntheticEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }
        }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";
