import React from 'react'

function RadioInput({ register, validationSchema = {}, id, name, label, value, watch }) {
    return (
        <div className="flex items-center gap-x-2 text-secondary-600">
            <label htmlFor={label}>{label}</label>
            <input
                id={label}
                className="cursor-pointer w-4 h-4 form-radio text-primary-900 focus:ring-primary-900 focus:ring-1"
                {...register(name, validationSchema)}
                name={name}
                value={value}
                type="radio" />
        </div>
    )
}

export default RadioInput