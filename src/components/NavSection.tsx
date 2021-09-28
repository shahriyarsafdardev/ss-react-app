import { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  BoxProps,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  ListItemButtonProps
} from '@material-ui/core';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary
}));

interface ListItemStyleProps extends ListItemButtonProps {
  component?: ReactNode;
  to?: string;
  name?: string;
}

const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

type NavItemProps = {
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
};

function NavItem({
  item,
  isShow,
  index
}: {
  index?: number;
  item: NavItemProps;
  isShow?: boolean | undefined;
}) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { title, path, icon, info, children } = item;
  const isActiveRoot = path ? !!matchPath({ path, end: false }, pathname) : false;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          disableGutters
          name="sidebar-items"
          onClick={handleOpen}
          id={index ? `cohort-${index}` : ''}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item, index) => {
                const { title, path } = item;
                const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;

                return (
                  <ListItemStyle
                    disableGutters
                    key={title}
                    id={`${title}-${index}`}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle)
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'text.disabled',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: 'primary.main'
                          })
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      disableGutters
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={item.title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

interface NavSectionProps extends BoxProps {
  isShow?: boolean | undefined;
  cohortsData?: any | undefined;
  navConfig: {
    subheader: string;
    items: NavItemProps[];
  }[];
}

export default function NavSection({
  navConfig,
  cohortsData = [],
  isShow = true,
  ...other
}: NavSectionProps) {
  const combinedItems = [navConfig[0].items[0], ...cohortsData, ...navConfig[0].items.slice(1)];

  return (
    <Box {...other}>
      <List key={navConfig[0].subheader} disablePadding>
        {isShow && <ListSubheaderStyle>{navConfig[0].subheader}</ListSubheaderStyle>}
        {combinedItems.map((item: NavItemProps) => (
          <NavItem key={item.title} item={item} isShow={isShow} />
        ))}
      </List>
    </Box>
  );
}
