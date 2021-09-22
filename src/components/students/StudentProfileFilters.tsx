import {
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  MenuItem,
  ListItemText,
  OutlinedInput
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const ViewSelector = styled('div')(() => ({
  paddingBottom: '40px'
}));

const StyledSelect = styled(Select)(() => ({
  borderRadius: 19,
  backgroundColor: '#F4F6F8',
  fontSize: '1.5rem',
  '&:hover:not(.Mui-disabled):before': {
    border: 'unset'
  },
  '&:before': {
    border: 'unset'
  },
  '&:hover': {
    border: 'unset'
  },
  '&:after': {
    borderBottom: 'unset'
  },
  '& .Mui-focused': {
    backgroundColor: 'unset'
  },
  '.css-d0xgh5-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input': {
    padding: '10px 20px',
    '&:focus': {
      backgroundColor: 'unset'
    }
  },
  '.css-jfl0wa-MuiSvgIcon-root-MuiSelect-icon': {
    color: '#212B36'
  }
}));

type StudentProfileFiltersProps = {
  companies: string[];
  selectedCompanies: string[];
  strengths: string[];
  selectedStrengths: string[];
  interests: string[];
  selectedInterests: string[];
  handleCompanyChange: (e: any) => void;
  handleStrengthChange: (e: any) => void;
  handleInterestChange: (e: any) => void;
  setView: (value: string) => void;
  view: string;
};
export default function StudentProfileFilters({
  companies,
  selectedCompanies,
  strengths,
  selectedStrengths,
  interests,
  selectedInterests,
  handleCompanyChange,
  handleStrengthChange,
  handleInterestChange,
  setView,
  view
}: StudentProfileFiltersProps) {
  return (
    <ViewSelector>
      <FormControl>
        <StyledSelect
          displayEmpty
          onChange={(e: any) => setView(e.target.value)}
          inputProps={{ 'aria-label': 'Without label' }}
          value={view}
          variant="filled"
          id="select-view"
        >
          <MenuItem key="card" value="card" id="grid-view">
            Grid View
          </MenuItem>
          <MenuItem key="list" value="list" id="table-view">
            Table View
          </MenuItem>
        </StyledSelect>
      </FormControl>
      <FormControl sx={{ marginLeft: 1, width: 110 }}>
        <InputLabel id="multiple-checkbox-label">Company</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedCompanies}
          onChange={handleCompanyChange}
          input={<OutlinedInput label="company" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {companies?.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedCompanies.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ marginLeft: 1, width: 110 }}>
        <InputLabel id="multiple-checkbox-label">Strength</InputLabel>
        <Select
          labelId="strength-label"
          id="multiple-checkbox-strength"
          multiple
          value={selectedStrengths}
          onChange={handleStrengthChange}
          input={<OutlinedInput label="strength" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {strengths?.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedStrengths.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ marginLeft: 1, width: 100 }}>
        <InputLabel id="multiple-checkbox-label">Interest</InputLabel>
        <Select
          labelId="interest-label"
          id="multiple-checkbox-interest"
          multiple
          value={selectedInterests}
          onChange={handleInterestChange}
          input={<OutlinedInput label="interest" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {interests?.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedInterests.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ViewSelector>
  );
}
