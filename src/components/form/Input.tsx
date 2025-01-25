import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
    name: string
    type: string,
    placeholder?: string,
    formControl?: UseFormRegisterReturn<string>,
    errors?: FieldErrors
}

const Input: React.FC<InputProps> = ({ name, type, placeholder, formControl, errors = {} }) => {

    const error = errors[name];

    return (
        <div className="flex flex-col w-full">
            <label className="font-regular text-zinc-700 ml-3 text-xl" htmlFor={name}>{placeholder} :</label>
            <input
                id={name}
                className="w-full h-14 p-3 text-xl border rounded-lg"
                type={type}
                placeholder={placeholder}
                {...formControl}
                aria-invalid={error ? "true" : "false"}
            />
            <span role="alert" className="font-regular text-xl text-red-500">{error && error.message?.toString()}</span>
        </div>
    );
};

export default Input;