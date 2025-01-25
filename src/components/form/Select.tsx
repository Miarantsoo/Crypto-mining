import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type SelectProps = {
    name: string
    formControl: UseFormRegisterReturn<string>
    errors?: FieldErrors
    options: { value: string | number; label: string }[]
    placeholder: string
} 

const Select: React.FC<SelectProps> = ({ 
    name, 
    formControl, 
    errors = {}, 
    options, 
    placeholder
}) => {
    const error = errors[name]

    return (
        <div className="flex flex-col w-full">
            <label className="font-body text-dark text-base mb-2" htmlFor={name}>{placeholder}</label>
            <select
                className="w-full h-11 p-2 border rounded-lg bg-light"
                {...formControl}
                aria-invalid={error ? "true" : "false"}
            >
                <option value="" disabled selected>
                    -
                </option>
                {options.map((option) => (
                    <option className="w-full font-body" key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span role="alert" className="font-body text-xl text-red-500">
                {error && error.message?.toString()}
            </span>
        </div>
    )
}

export default Select