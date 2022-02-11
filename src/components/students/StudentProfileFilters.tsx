import { useContext } from 'react';
import {
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  MenuItem,
  ListItemText
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { trackPeersPageEvent, PEERS_PAGE_EVENTS } from 'utils/amplitude';
import { CohortContext } from 'contexts/CohortContext';

const ViewSelector = styled('div')(() => ({
  paddingBottom: '40px'
}));

type StudentProfileFiltersProps = {
  companies: string[];
  selectedCompanies: string[];
  handleCompanyChange: (e: any) => void;
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
  handleCompanyChange,
  setView,
  view
}: StudentProfileFiltersProps) {
  const { cohortName, cohortIntake } = useContext(CohortContext);

  const trackFilters = (type: string) => {
    trackPeersPageEvent(cohortName, cohortIntake, `${view} view`.toUpperCase(), type);
  };

  const onViewSwitch = (selectedView: string) => {
    trackPeersPageEvent(
      cohortName,
      cohortIntake,
      PEERS_PAGE_EVENTS.view_selection,
      `Switched to ${selectedView.toUpperCase()} view`
    );
    setView(selectedView);
  };

  return (
    <ViewSelector data-testid="user-filters">
      <FilterFormControl data-testid="view-mode">
        <InputLabel id="view-label">View</InputLabel>
        <Select
          displayEmpty
          labelId="view-label"
          id="view-label"
          onChange={(e: any) => {
            onViewSwitch(e.target.value);
          }}
          label="View"
          value={view}
        >
          <MenuItem key="grid" value="grid" id="grid-view" data-testid="peer-grid-view">
            Grid View
          </MenuItem>
          <MenuItem key="list" value="list" id="table-view" data-testid="peer-table-view">
            Table View
          </MenuItem>
        </Select>
      </FilterFormControl>
      <FilterFormControl data-testid="company-select">
        <InputLabel id="multiple-checkbox-label">Filter by Company</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedCompanies}
          onChange={(e) => {
            handleCompanyChange(e);
            trackFilters('Company Filter');
          }}
          label="Filter by Company"
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{ sx: { maxHeight: 500 } }}
        >
          {companies?.map((name: any, index: number) => (
            <MenuItem key={name} value={name} sx={{ paddingRight: 1 }}>
              <Checkbox
                checked={selectedCompanies.indexOf(name) > -1}
                data-testid={`company-${index + 1}`}
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FilterFormControl>
    </ViewSelector>
  );
}
