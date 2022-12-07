import { FormControl, MenuItem, InputLabel, Select, ListItemText, Grid } from '@material-ui/core';
import { RootState, useSelector } from 'redux/store';
import { trackEvent } from 'utils/eventTracking';

export default function AllCoursesFilters({
  setSelectedFunction,
  selectedFunction,
  functions,
  setSelectedTopic,
  selectedTopic,
  topics,
  setSelectedSeniority,
  selectedSeniority,
  seniority,
  handleChangeFunction
}: {
  setSelectedFunction: Function;
  selectedFunction: string;
  functions: String[];
  setSelectedTopic: Function;
  selectedTopic: string;
  topics: String[];
  setSelectedSeniority: Function;
  selectedSeniority: string;
  seniority: String[];
  handleChangeFunction: Function;
}) {
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);

  const handleFunctionChange = (value: any) => {
    trackEvent(cohort, 'All Courses Page - Filter by Function selected', { 'Filter Name': value });
    handleChangeFunction(value);
  };

  const handleTopicChange = (value: any) => {
    trackEvent(cohort, 'All Courses Page - Filter by Topic selected', { 'Filter Name': value });
    setSelectedTopic(value);
  };

  return (
    <Grid container spacing={{ xs: 2.5, md: 2 }}>
      {functions.length > 0 && (
        <Grid item md={4} sm={6} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="function-filter">Filter by Function</InputLabel>
            <Select
              MenuProps={{ sx: { maxHeight: 500 } }}
              onChange={(e: any) => handleFunctionChange(e.target?.value)}
              labelId="function-filter"
              value={selectedFunction}
              label="Filter by Function"
            >
              {functions.map((type: any) => (
                <MenuItem key={type} value={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      {topics.length > 0 && (
        <Grid item md={4} sm={6} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="topic-filter">Filter by Topic</InputLabel>
            <Select
              MenuProps={{ sx: { maxHeight: 500 } }}
              onChange={(e: any) => handleTopicChange(e.target?.value)}
              labelId="topic-filter"
              value={selectedTopic || 'All'}
              label="Filter by Topic"
            >
              {topics.map((type: any) => (
                <MenuItem key={type} value={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      {seniority.length > 0 && (
        <Grid item md={4} sm={6} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="seniority-filter">Filter by Seniority</InputLabel>
            <Select
              MenuProps={{ sx: { maxHeight: 500 } }}
              onChange={(e: any) => setSelectedSeniority(e.target?.value)}
              labelId="seniority-filter"
              value={selectedSeniority}
              label="Filter by Seniority"
            >
              {seniority.map((type: any) => (
                <MenuItem
                  onClick={() => selectedSeniority.indexOf(type) === -1}
                  key={type}
                  value={type}
                >
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
}
