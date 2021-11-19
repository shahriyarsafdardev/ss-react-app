import Select from 'react-select';

const customStyles = {
  placeholder: (provided: any, state: any) => ({
    display: state.isFocused ? 'none' : 'block',
    color: 'rgb(128, 128, 128)'
  })
};

export default function MultiSelect({
  options,
  onChange,
  values,
  maxLimit
}: {
  options: string[] | undefined;
  onChange: Function;
  values: string[];
  maxLimit?: number;
}) {
  const handleChange = (values: any) => {
    onChange(values.map((item: any) => item.value));
  };

  if (!options) return null;

  const selectedValues = values || [];

  return (
    <div>
      <Select
        defaultValue={selectedValues.map((option) => ({ value: option, label: option }))}
        options={
          // eslint-disable-next-line no-nested-ternary
          maxLimit
            ? selectedValues.length < maxLimit
              ? options?.map((option) => ({ value: option, label: option }))
              : []
            : options?.map((option) => ({ value: option, label: option }))
        }
        noOptionsMessage={() =>
          selectedValues.length === maxLimit
            ? "You've reached the max options value"
            : 'No options available'
        }
        isClearable={false}
        styles={customStyles}
        backspaceRemovesValue={true}
        placeholder={<div>Select from list</div>}
        isMulti
        isSearchable
        onChange={handleChange}
        id="multi-select"
      />
    </div>
  );
}
