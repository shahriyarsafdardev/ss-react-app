import { useState, useContext, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Stack,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
  Typography,
  Button
} from '@material-ui/core';
import searchFill from '@iconify/icons-eva/search-fill';
import { Icon } from '@iconify/react';
import axios from 'utils/axios';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import LoadingScreen from 'components/LoadingScreen';
import { useLocation } from 'react-router-dom';
import ResourcesTypesFilter from './ResourcesTypesFilter';
import { getDisplayName, AdditionalFilters } from './Common';
import ResourcesTile from './ResourcesTile';
import { LoadingContainer } from '../code/CodeTab';

function ResourceFilter({
  types,
  setIsSearch,
  isSearch,
  isPublic,
  setState,
  categoryState,
  sessionState
}: {
  types: String[];
  isSearch: boolean;
  setIsSearch: Function;
  isPublic: boolean;
  setState: Function;
  categoryState: string;
  sessionState: number | null;
}) {
  const theme = useTheme();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [filteredMaterials, setFilteredMaterials] = useState<any[]>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const [timer, setTimer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const url = new URLSearchParams(useLocation().search);
  const source = url.get('source') || '';

  const handleOnChange = (value: any, request: string) => {
    let types = [];
    if (request == 'materialCategory') {
      setState('', 'string');
      return;
    }
    if (request == 'sessionNumber') {
      setState('', 'number');
      return;
    }
    if (request === 'query') {
      setSearchQuery(value);
      inputChanged(value, selectedTypes);
    } else if (request === 'desktop-view-types') {
      if (selectedTypes.includes(value)) {
        types = selectedTypes.filter((t) => t !== value);
        setSelectedTypes(types);
      } else {
        types = [...selectedTypes, value];
        sendAnalyticsData('Resources Page - Filter Selected', {
          'Selected Filter': value,
          Source: source
        });
        setSelectedTypes(types);
      }
      inputChanged(searchQuery, types);
    } else {
      setSelectedTypes(value);
      inputChanged(searchQuery, value);
    }

    if (
      request === 'query' &&
      value === '' &&
      selectedTypes.length === 0 &&
      !sessionState &&
      !categoryState
    ) {
      setIsSearch(false);
    } else if (
      request === 'desktop-view-types' &&
      searchQuery === '' &&
      types.length === 0 &&
      !sessionState &&
      !categoryState
    ) {
      setIsSearch(false);
    } else if (
      request === 'mobile-view-types' &&
      searchQuery === '' &&
      value.length === 0 &&
      !sessionState &&
      !categoryState
    ) {
      setIsSearch(false);
    } else {
      !isSearch && setIsSearch(true);
    }
  };

  const inputChanged = (query: string, types: String[]) => {
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      setLoading(true);
      await axios
        .get(
          `/cohorts/${cohort_id}/resources/search.json?search_query=${query}&selected_types=${types?.join(
            ','
          )}&session=${!sessionState ? '' : sessionState}&category=${categoryState}`
        )
        .then((res) => {
          !!query &&
            sendAnalyticsData('Resources Page - Search Made', {
              'Search Query': query,
              Source: source
            });
          setFilteredMaterials(res.data.materials);
          setLoading(false);
        });
    }, 300);

    setTimer(newTimer);
  };

  useEffect(() => {
    if (sessionState || categoryState) {
      setIsSearch(true);
      inputChanged(searchQuery, selectedTypes);
    } else if (selectedTypes.length === 0 && !searchQuery) {
      setIsSearch(false);
    } else {
      inputChanged(searchQuery, selectedTypes);
    }
  }, [sessionState, categoryState]);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setIsSearch(false);
  };

  return (
    <Stack direction="column" width="100%">
      {isSearch && (
        <Button
          sx={{ marginBottom: '20px', width: 'fit-content' }}
          variant="text"
          onClick={clearSearch}
        >
          {'< Back'}
        </Button>
      )}
      <TextField
        fullWidth
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleOnChange(e.target.value, 'query')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                style={{ marginLeft: '5px' }}
                icon={searchFill}
                width={25}
                height={25}
                color="#101658"
              />
            </InputAdornment>
          )
        }}
        color="primary"
        sx={{ marginBottom: '30px' }}
      />
      {!mobileView ? (
        <ResourcesTypesFilter
          types={types}
          sessionNumber={sessionState}
          materialCategory={categoryState}
          selectedTypes={selectedTypes}
          handleOnChange={handleOnChange}
        />
      ) : (
        <Stack direction="column" width="100%" spacing={2} sx={{ mb: 2 }}>
          <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
            <InputLabel id="resource-filter">Filter by Material Type</InputLabel>
            <Select
              MenuProps={{ sx: { maxHeight: 500 } }}
              multiple
              onChange={(e: any) => handleOnChange(e.target?.value, 'mobile-view-types')}
              labelId="resource-filter"
              value={selectedTypes}
              renderValue={(selected) => selected.join(', ')}
              label="Filter by Material Type"
              sx={{ width: '100%' }}
            >
              {types.map((type: any) => (
                <MenuItem
                  onClick={() =>
                    selectedTypes.indexOf(type) === -1 &&
                    sendAnalyticsData('Resources Page - Filter Selected', {
                      'Selected Filter': type,
                      Source: source
                    })
                  }
                  key={type}
                  value={type}
                >
                  <Checkbox checked={selectedTypes.includes(type)} />
                  <ListItemText primary={getDisplayName(type)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <AdditionalFilters
            handleOnChange={handleOnChange}
            sessionNumber={sessionState}
            materialCategory={categoryState}
          />
        </Stack>
      )}
      {!loading && (
        <>
          {searchQuery && (
            <Typography sx={{ color: '#000', fontSize: '20px', marginBottom: '20px' }}>
              {filteredMaterials && filteredMaterials?.length !== 0
                ? `All results for `
                : `No results found for `}
              <b>"{searchQuery}"</b>
            </Typography>
          )}
          {isSearch && filteredMaterials?.length !== 0 && (
            <Stack spacing={2}>
              {filteredMaterials?.map((material: any, index: any) => (
                <ResourcesTile
                  key={index}
                  isPublic={isPublic}
                  sessionID={material?.session_id}
                  material={material}
                  sessionData={{
                    session_name: material?.session_name,
                    session_number: material?.session_number
                  }}
                  setState={setState}
                />
              ))}
            </Stack>
          )}
        </>
      )}
      {isSearch && loading && (
        <Stack justifyContent="center" alignItems="center" sx={{ mt: 18 }}>
          <LoadingScreen />
        </Stack>
      )}
    </Stack>
  );
}

export default ResourceFilter;
