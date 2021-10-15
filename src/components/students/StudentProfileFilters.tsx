import {
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  MenuItem,
  ListItemText
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { sendAmplitudeData, EVENT_TYPES } from 'utils/amplitude';

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

const FilterFormControl = styled(FormControl)(({ theme }) => ({
  marginRight: '8px',
  width: '180px',
  [theme.breakpoints.down('md')]: {
    marginTop: '8px'
  }
}));

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
  const trackFilters = (type: string, value: string | string[]) => {
    sendAmplitudeData(EVENT_TYPES.peers_filters, {
      type,
      value
    });
  };

  return (
    <ViewSelector>
      <FilterFormControl>
        <InputLabel id="view-label">View</InputLabel>
        <Select
          displayEmpty
          labelId="view-label"
          id="view-label"
          onChange={(e: any) => {
            setView(e.target.value);
            trackFilters('view', e.target.value);
          }}
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
      </FilterFormControl>
      <FilterFormControl>
        <InputLabel id="multiple-checkbox-label">Filter by Company</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedCompanies}
          onChange={(e) => {
            handleCompanyChange(e);
            trackFilters('companies', e.target.value);
          }}
          label="Filter by Company"
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{ sx: { maxHeight: 500 } }}
        >
          {companies?.map((name: any) => (
            <MenuItem key={name} value={name} sx={{ paddingRight: 1 }}>
              <Checkbox checked={selectedCompanies.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FilterFormControl>
      <FilterFormControl>
        <InputLabel id="multiple-checkbox-label">Filter by Strengths</InputLabel>
        <Select
          labelId="strength-label"
          id="multiple-checkbox-strength"
          multiple
          value={selectedStrengths}
          onChange={(e) => {
            handleStrengthChange(e);
            trackFilters('strengths', e.target.value);
          }}
          label="Filter by Strengths"
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{ sx: { maxHeight: 500, main: { paddingRight: 8 } } }}
        >
          {strengths?.map((name: any) => (
            <MenuItem key={name} value={name} sx={{ paddingRight: 1 }}>
              <Checkbox checked={selectedStrengths.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FilterFormControl>
      <FilterFormControl>
        <InputLabel id="multiple-checkbox-label">Filter by Interests</InputLabel>
        <Select
          labelId="interest-label"
          id="multiple-checkbox-interest"
          multiple
          value={selectedInterests}
          onChange={(e) => {
            handleInterestChange(e);
            trackFilters('interests', e.target.value);
          }}
          label="Filter by Interests"
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{ sx: { maxHeight: 500, main: { paddingRight: 8 } } }}
        >
          {interests?.map((name: any) => (
            <MenuItem key={name} value={name} sx={{ paddingRight: 1 }}>
              <Checkbox checked={selectedInterests.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FilterFormControl>
    </ViewSelector>
  );
}
