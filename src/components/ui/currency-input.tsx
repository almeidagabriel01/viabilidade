import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: number;
    onChange: (value: number) => void;
}

export function CurrencyInput({ value, onChange, className, ...props }: CurrencyInputProps) {
    const [displayValue, setDisplayValue] = useState('');

    // Format number to currency string
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(val);
    };

    // Update display value when prop value changes
    useEffect(() => {
        // Only update if the numeric value matches what we expect
        // This prevents cursor jumping issues during typing if we were to format on every keystroke
        // But for this simple implementation, we'll format on blur or initial load
        if (value !== undefined) {
            // Remove non-digits to compare
            const currentNumeric = Number(displayValue.replace(/\D/g, '')) / 100;
            if (currentNumeric !== value) {
                setDisplayValue(formatCurrency(value));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Remove everything that is not a digit
        const digits = inputValue.replace(/\D/g, '');

        // Convert to number (divide by 100 to handle cents)
        const numericValue = Number(digits) / 100;

        // Update parent with numeric value
        onChange(numericValue);

        // Update local display with formatting
        // We format immediately to give the "mask" effect
        setDisplayValue(formatCurrency(numericValue));
    };

    return (
        <Input
            {...props}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            className={className}
        />
    );
}
