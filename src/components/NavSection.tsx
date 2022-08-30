import { useState, useEffect, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import useAuth from 'hooks/useAuth';
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
import { trackSidebarEvent } from 'utils/amplitude';
import { RootState, useSelector } from '../redux/store';
// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2),
  color: theme.palette.primary.main,
  textTransform: 'uppercase'
}));

interface ListItemStyleProps extends ListItemButtonProps {
  component?: ReactNode;
  to?: string;
  name?: string;
}

const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(({ theme }) => ({
  ...theme.typography.body2,
  minHeight: 48,
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
  },
  '.count': {
    background: '#12125C',
    color: 'white',
    borderRadius: '2px',
    padding: '0 5px',
    minWidth: '24px',
    minHeight: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px'
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ListItemCount = styled(ListItemText)({
  background: '#12125C',
  color: 'white',
  borderRadius: '2px',
  padding: '0 5px',
  minWidth: '24px',
  minHeight: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px'
});
// ----------------------------------------------------------------------

type NavItemProps = {
  id?: string;
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: JSX.Element;
  children?: {
    title: string;
    path: string;
    externalUrl?: boolean;
    notifications?: boolean;
    category?: string;
  }[];
};

function NavItem({
  item,
  isShow,
  index,
  header
}: {
  index?: number;
  item: NavItemProps;
  isShow?: boolean | undefined;
  header: string;
}) {
  const theme = useTheme();
  const location = useLocation();
  const { pathname } = location;
  const cohort_id = pathname.split('/')[2] || '';
  const { id, title, path, icon, info, children } = item;
  const isActiveRoot = pathname.includes(path);
  const userNotifications = useSelector((state: RootState) => state.notification.notifications);
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const [open, setOpen] = useState(isActiveRoot);
  const { user } = useAuth();

  useEffect(() => {
    setOpen(isActiveRoot);
  }, [isActiveRoot, pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const getUnreadNotifications = (category: string | undefined) =>
    userNotifications?.filter(
      (notification) => id === notification.cohort_id && category === notification.category
    );

  const activeRootStyle = {
    color: 'text.primary',
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
              <ListItemText
                data-testid={`navbar-${user?.type}-cohort-${header}-${title}`}
                disableTypography
                primary={title}
              />
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
              {children.map((heading_item, index) => {
                const { title, path, externalUrl, category, notifications } = heading_item;
                const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;

                return (
                  <ListItemStyle
                    data-testid={`navbar-cohort-${user?.type}-page-list-${header}-${item.title}-${title}`}
                    disableGutters
                    key={`${title}-${userNotifications.length}`}
                    id={`${title}-${index}`}
                    component={RouterLink}
                    onClick={() => {
                      if (externalUrl) {
                        window.open(path, '_blank');
                      }
                      cohort &&
                        trackSidebarEvent(
                          cohort,
                          `Sidebar - '${title.charAt(0).toUpperCase() + title.slice(1)}' Selected`
                        );
                    }}
                    to={externalUrl ? '' : path}
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
                    {notifications && category && getUnreadNotifications(category).length > 0 && (
                      <span className="count">{getUnreadNotifications(category).length}</span>
                    )}
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
      <ListItemIconStyle> {icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText
            data-testid={`navbar-cohort-${title}`}
            disableTypography
            primary={item.title}
          />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

interface NavSectionProps extends BoxProps {
  isShow?: boolean | undefined;
  navConfig: {
    subheader: string;
    items: NavItemProps[];
  };
}

export default function NavSection({ navConfig, isShow = true, ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      <List key={navConfig.subheader} disablePadding>
        {isShow && (
          <ListSubheaderStyle data-testid="navbar-cohort">{navConfig.subheader}</ListSubheaderStyle>
        )}
        {navConfig.items.map((item: NavItemProps) => (
          <NavItem key={item.title} item={item} isShow={isShow} header={navConfig.subheader} />
        ))}
      </List>
    </Box>
  );
}
