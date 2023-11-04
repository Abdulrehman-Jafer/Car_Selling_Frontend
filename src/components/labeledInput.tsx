export default function LabeledInput({
  label,
  inputName,
  type = "text",
  value,
  onChange,
  placeholder
}: {
  label: string;
  inputName: string;
  value: string;
  type: string;
  pattern?: string;
  placeholder: string;
  onChange: (e: any) => void;
}) {
  return (
    <section className="flex">
      <label htmlFor={inputName} className="font-bold text-3xl">
        {label}:
      </label>
      <input
        type={type}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        value={value}
        className="border-2 text-2xl ms-2 w-full indent-2"
        onChange={(e) => onChange(e)}
        required
      />
    </section>
  );
}
