import { Stack, Typography, Chip } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { useStyles, getColor } from './Common';

export default function CourseFiltersSidebar({
  categories,
  subCategories,
  selectedCategory,
  setSelectedCategory
}: {
  categories: string[];
  subCategories: string[];
  selectedCategory: string;
  setSelectedCategory: Function;
}) {
  const classes = useStyles();

  const handleCategories = (value: string) => {
    if (selectedCategory === value) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(value);
      trackEvent(null, 'All Courses Page - Filter selected', {
        'Filter Name': value
      });
    }
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      width={{ xs: '100%', md: '293px' }}
      sx={{
        padding: '40px 30px',
        position: { md: 'sticky' },
        top: '73px',
        maxHeight: 'calc(100vh - 75px)',
        overflow: 'auto',
        height: 'fit-content',
        pr: { xs: '0px' }
      }}
    >
      <Typography className={classes.filtersHeader}>Filters</Typography>
      <Stack direction="column" spacing={2}>
        <Typography className={classes.filtersSubHeader}>Business Unit</Typography>
        <Stack
          spacing={2}
          direction={{ xs: 'row', md: 'column' }}
          sx={{ overflowX: 'auto' }}
          width="100%"
        >
          {categories.map((category) => (
            <Chip
              label={category}
              key={category}
              variant="outlined"
              onClick={() => handleCategories(category)}
              className={selectedCategory === category ? classes.tileChip : classes.chipStyle}
              sx={{
                backgroundColor: `${
                  selectedCategory === category ? getColor(category) : null
                } !important`,
                '&:hover': {
                  backgroundColor: `${getColor(category)} !important`,
                  color: '#ffffff'
                }
              }}
              clickable
            />
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2} direction="column">
        <Typography className={classes.filtersSubHeader}>Subcategory</Typography>
        <Stack
          spacing={2}
          direction={{ xs: 'row', md: 'column' }}
          sx={{ overflowX: 'auto' }}
          width="100%"
        >
          {subCategories.map((subCategory) => (
            <Chip
              label={subCategory}
              key={subCategory}
              variant="outlined"
              onClick={() => handleCategories(subCategory)}
              className={
                selectedCategory === subCategory ? classes.selectedChip : classes.chipStyle
              }
              sx={{
                '&:hover': {
                  backgroundColor: '#F1F1FB !important'
                }
              }}
              clickable
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
