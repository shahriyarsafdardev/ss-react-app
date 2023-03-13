import { ReactNode } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import _ from 'lodash';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  BoxProps,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps
} from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
// ----------------------------------------------------------------------

interface ListItemStyleProps extends ListItemButtonProps {
  component?: ReactNode;
  to?: string;
  name?: string;
}

const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(({ theme }) => ({
  minHeight: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: '#FFFFFF',
  background: 'linear-gradient(135.12deg, #9349D2 0.07%, #39185A 100.02%)',
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
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
  id?: string;
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: JSX.Element;
};

function NavItem({ item, isShow }: { item: NavItemProps; isShow?: boolean | undefined }) {
  const location = useLocation();
  const { pathname } = location;
  const { title, path, icon, info } = item;
  const isActiveRoot = pathname.includes(path);

  const trackAnalyticsEvent = (title: string, path: string) =>
    trackEvent(null, `Sidebar - "${title.replace(/\w+/g, _.capitalize)}" Selected`);

  const activeRootStyle = {
    fontWeight: 'fontWeightMedium',
    '&:before': { display: 'block' }
  };

  return (
    <ListItemStyle
      disableGutters
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
      onClick={() => trackAnalyticsEvent(title, path)}
    >
      <ListItemIconStyle> {icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText
            data-testid={`navbar-cohort-${title}`}
            disableTypography
            primary={item.title}
          />
          {info}
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

export default function PurpleNavSection({ navConfig, isShow = true, ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      <List key={navConfig.subheader} disablePadding>
        {navConfig.items.map((item: NavItemProps) => (
          <NavItem key={item.title + item.id} item={item} isShow={isShow} />
        ))}
      </List>
    </Box>
  );
}
