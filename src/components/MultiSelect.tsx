import { Autocomplete, Chip, TextField } from '@material-ui/core';

export const customStyles = {
  placeholder: (provided: any, state: any) => ({
    display: state.isFocused ? 'none' : 'block',
    color: 'rgb(128, 128, 128)'
  }),
  multiValue: (provided: any, state: any) => ({
    backgroundColor: 'rgba(77, 77, 205, 0.16)',
    padding: '1px 2px 1px 8px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '6px',
    color: '#12125C',
    margin: '5px 5px 5px 0px',
    fontWeight: 700,
    fontSize: '14px'
  }),
  multiValueLabel: (provided: any, state: any) => ({
    color: '#12125C'
  }),
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isFocused ? '#12125C' : '#CCCCCC',
    boxShadow: state.isFocused ? '0 0 0 1px #12125c' : 0,
    '&:hover': {
      borderColor: '#12125C'
    }
  })
};

export default function MultiSelect({
  options,
  onChange,
  values,
  maxLimit,
  label
}: {
  options: string[] | undefined;
  onChange: Function;
  values: string[];
  maxLimit?: number;
  label?: string;
}) {
  if (!options) return null;

  const selectedValues = values || [];

  return (
    <div>
      <Autocomplete
        multiple
        freeSolo={false}
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
