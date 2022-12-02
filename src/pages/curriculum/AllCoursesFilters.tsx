import { FormControl, MenuItem, InputLabel, Select, ListItemText, Grid } from '@material-ui/core';

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
  return (
    <Grid container spacing={{ xs: 1, md: 2 }}>
      {functions.length > 0 && (
        <Grid item md={4} sm={6} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="function-filter">Filter by Function</InputLabel>
            <Select
              MenuProps={{ sx: { maxHeight: 500 } }}
              onChange={(e: any) => handleChangeFunction(e.target?.value)}
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
              onChange={(e: any) => setSelectedTopic(e.target?.value)}
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
