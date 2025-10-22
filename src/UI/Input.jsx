

function Input({ type, label, placeholder, name, register }) {
    return (
        <div>
            <label for={label} className="block my-2 text-sm text-[#00000]">{label}</label>
            <input
                {...register(name)}
                id={label}
                type={type}
                placeholder={placeholder}
                className="input--style"
            />
        </div>

    )
}

export default Input;