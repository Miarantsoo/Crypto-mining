import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  name: string;
  type: string;
  placeholder?: string;
  formControl?: UseFormRegisterReturn<string>;
  errors?: FieldErrors;
  fullFormat?: boolean; // Add the new optional prop
};

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  formControl,
  errors = {},
  fullFormat = true, // Default to true
}) => {
  const error = errors[name];

  return (
    <div className={`flex flex-col ${fullFormat ? "w-full" : ""}`}>
      {/* Conditionally render the label */}
      {fullFormat && (
        <label className="font-body text-dark mb-2 text-base" htmlFor={name}>
          {placeholder}
        </label>
      )}
      <input
        id={name}
        className="w-full h-11 p-2 border rounded-lg font-body"
        type={type}
        placeholder={placeholder}
        {...formControl}
        aria-invalid={error ? "true" : "false"}
      />
      <span role="alert" className="font-body text-xl text-red-500">
        {error && error.message?.toString()}
      </span>
    </div>
  );
};

export default Input;
