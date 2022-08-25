import { Autocomplete, TextField } from '@material-ui/core';

export default function MultiSelect({
  options,
  onChange,
  value,
  label,
  isCreatable = true
}: {
  options: string[] | undefined;
  onChange: Function;
  value: string;
  maxLimit?: number;
  label?: string;
  isCreatable?: boolean;
}) {
  if (!options) return null;

  return (
    <div>
      <Autocomplete
        freeSolo={isCreatable}
        value={value}
        onBlur={(event: any) => {
          onChange(event.target?.value ? event.target.value : value);
        }}
        noOptionsText="No options available"
        options={options?.map((option) => option)}
        renderInput={(params) => <TextField {...params} label={label || ''} />}
      />
    </div>
  );
}
