export default function LabeledInput({
  label,
  inputName,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  inputName: string;
  value: string;
  type: string;
  pattern?: string;
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
        value={value}
        className="border-2 text-2xl ms-2 w-full"
        onChange={(e) => onChange(e)}
        required
      />
    </section>
  );
}
