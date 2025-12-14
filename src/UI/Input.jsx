

function Input({ type, label, placeholder, name, register, validationSchema = {}, errors }) {
    return (
        <div>
            <label for={label} className="block my-2 text-sm text-[#00000]">{label}</label>
            <input
                {...register(name, validationSchema)}
                id={label}
                type={type}
                placeholder={placeholder}
                className="input--style"
            />
            {errors && errors[name] && (
                <span className="text-error block text-sm mt-2">
                    {errors[name]?.message}
                </span>
            )}
        </div>

    )
}

export default Input;