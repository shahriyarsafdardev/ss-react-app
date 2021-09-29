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
        <InputLabel id="view-label">View</InputLabel>
        <Select
          displayEmpty
          labelId="view-label"
          id="view-label"
          onChange={(e: any) => setView(e.target.value)}
          label="View"
          value={view}
        >
          <MenuItem key="card" value="card" id="grid-view">
            Grid View
          </MenuItem>
          <MenuItem key="list" value="list" id="table-view">
            Table View
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginLeft: 1, width: 180 }}>
        <InputLabel id="multiple-checkbox-label">Filter by Company</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedCompanies}
          onChange={handleCompanyChange}
          label="Filter by Company"
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
      <FormControl sx={{ marginLeft: 1, width: 180 }}>
        <InputLabel id="multiple-checkbox-label">Filter by Strength</InputLabel>
        <Select
          labelId="strength-label"
          id="multiple-checkbox-strength"
          multiple
          value={selectedStrengths}
          onChange={handleStrengthChange}
          label="Filter by Strength"
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
      <FormControl sx={{ marginLeft: 1, width: 180 }}>
        <InputLabel id="multiple-checkbox-label">Filter by Interest</InputLabel>
        <Select
          labelId="interest-label"
          id="multiple-checkbox-interest"
          multiple
          value={selectedInterests}
          onChange={handleInterestChange}
          label="Filter by Interest<"
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
