import React from 'react'
import { FormControl, FormDescription, FormLabel, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Controller, FieldValue, FieldValues, Path, Control } from 'react-hook-form';

interface FormFeildProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder: string;
    type?: "text" | "email" | "password" | "file";
}

const FormField = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
}: FormFeildProps<T>) => (
    <Controller
        name={name}
        control={control}
        
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input className='input' placeholder={placeholder} type={type} {...field} />
                </FormControl>
                <FormDescription>
                    
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default FormField;