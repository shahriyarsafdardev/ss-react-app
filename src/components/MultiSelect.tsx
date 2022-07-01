import { Autocomplete, Chip, TextField } from '@material-ui/core';

export default function MultiSelect({
  options,
  onChange,
  values,
  maxLimit,
  label,
  isCreatable = false
}: {
  options: string[] | undefined;
  onChange: Function;
  values: string[];
  maxLimit?: number;
  label?: string;
  isCreatable?: boolean;
}) {
  if (!options) return null;

  const selectedValues = values || [];

  return (
    <div>
      <Autocomplete
        multiple
        freeSolo={isCreatable}
        value={values}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        noOptionsText={
          selectedValues.length === maxLimit
            ? "You've reached the max options value"
            : 'No options available'
        }
        options={
          // eslint-disable-next-line no-nested-ternary
          maxLimit
            ? selectedValues.length < maxLimit
              ? options?.map((option) => option)
              : []
            : options?.map((option) => option)
        }
        renderTags={(value, getTagProps) => [
          ...value.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <Chip size="small" label={option} {...getTagProps({ index })} />
          ))
        ]}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
