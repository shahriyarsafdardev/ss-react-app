import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';
import { SectionContainer } from './Common';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const orderOptions = ['Answer Date', 'Question Date'];
const filterOptions = ['All', 'Answered', 'Unanswered'];

const getStyles = (name: string, options: string[]) => ({
  fontWeight: options.indexOf(name) === -1 ? 500 : 700
});

const Filters = () => {
  const [orderBy, setOrderBy] = useState([]);
  const [filterBy, setFilterBy] = useState([]);

  const handleChange = (event: any, stateHandler: Function) => {
    const {
      target: { value }
    } = event;
    stateHandler(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <SectionContainer className="filters">
      <b>Filters</b>
      <Box>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="order-name-label">Order by</InputLabel>
          <Select
            labelId="order-name-label"
            value={orderBy}
            onChange={(e) => handleChange(e, setOrderBy)}
            input={<OutlinedInput label="Order By" />}
            MenuProps={MenuProps}
          >
            {orderOptions.map((option) => (
              <MenuItem key={option} value={option} style={getStyles(option, orderBy)}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="filter-name-label">Filter by Status</InputLabel>
          <Select
            labelId="filter-name-label"
            value={filterBy}
            onChange={(e) => handleChange(e, setFilterBy)}
            input={<OutlinedInput label="Filter by Status" />}
            MenuProps={MenuProps}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option} style={getStyles(option, filterBy)}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </SectionContainer>
  );
};

export default Filters;
