import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Grid
} from '@material-ui/core';

export default function AllCoursesFilters({
  setSelectedFunctions,
  selectedFunctions,
  functions,
  setSelectedTopics,
  selectedTopics,
  topics,
  setSelectedSeniority,
  selectedSeniority,
  seniority
}: {
  setSelectedFunctions: Function;
  selectedFunctions: String[];
  functions: String[];
  setSelectedTopics: Function;
  selectedTopics: String[];
  topics: String[];
  setSelectedSeniority: Function;
  selectedSeniority: String[];
  seniority: String[];
}) {
  return (
    <Grid container spacing={{ xs: 2.5, md: 2 }}>
      {functions.length > 0 && (
        <Grid item md={4} sm={6} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="function-filter">Filter by Function</InputLabel>
            <Select
              MenuProps={{ sx: { maxHeight: 500 } }}
              multiple
              onChange={(e: any) => setSelectedFunctions(e.target?.value)}
              labelId="function-filter"
              value={selectedFunctions}
              renderValue={(selected) => selected.join(', ')}
              label="Filter by Function"
            >
              {functions.map((type: any) => (
                <MenuItem
                  onClick={() => selectedFunctions.indexOf(type) === -1}
                  key={type}
                  value={type}
                >
                  <Checkbox checked={selectedFunctions.includes(type)} />
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
              multiple
              onChange={(e: any) => setSelectedTopics(e.target?.value)}
              labelId="topic-filter"
              value={selectedTopics}
              renderValue={(selected) => selected.join(', ')}
              label="Filter by Topic"
            >
              {topics.map((type: any) => (
                <MenuItem
                  onClick={() => selectedTopics.indexOf(type) === -1}
                  key={type}
                  value={type}
                >
                  <Checkbox checked={selectedTopics.includes(type)} />
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
              multiple
              onChange={(e: any) => setSelectedSeniority(e.target?.value)}
              labelId="seniority-filter"
              value={selectedSeniority}
              renderValue={(selected) => selected.join(', ')}
              label="Filter by Seniority"
            >
              {seniority.map((type: any) => (
                <MenuItem
                  onClick={() => selectedSeniority.indexOf(type) === -1}
                  key={type}
                  value={type}
                >
                  <Checkbox checked={selectedSeniority.includes(type)} />
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
