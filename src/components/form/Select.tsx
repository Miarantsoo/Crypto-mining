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
            <label className="font-regular text-zinc-700 ml-3 text-xl" htmlFor={name}>{placeholder} :</label>
            <select
                className="w-full h-14 p-3 text-xl border rounded-lg bg-white"
                {...formControl}
                aria-invalid={error ? "true" : "false"}
            >
                <option value="" disabled selected>
                    -
                </option>
                {options.map((option) => (
                    <option className="w-full font-regular" key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span role="alert" className="font-regular text-xl text-red-500">
                {error && error.message?.toString()}
            </span>
        </div>
    )
}

export default Select