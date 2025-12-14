import React from 'react'
import RadioInput from './RadioInput'

function RadioInputGroup({ register, watch, errors, configs , label }) {
    const { name, validationSchema = {}, options } = configs;

    return (
        <div className="py-3" >
            <label htmlFor=""> {label} </label>
            <div className="flex flex-wrap items-center justify-center gap-x-8">
                {options.map(({ label, value }) => (
                    <RadioInput
                        key={value}
                        label={label}
                        value={value}
                        id={value}
                        name={name}
                        register={register}
                        watch={watch}
                        validationSchema={validationSchema}
                        errors={errors}
                    />
                ))}
            </div>
            {errors && errors[name] && (
                <span className="text-error block text-sm mt-2 flex-1">
                    {errors[name]?.message}
                </span>
            )}
        </div>
    );
}

export default RadioInputGroup