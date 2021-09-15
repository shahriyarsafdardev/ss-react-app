// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Avatar, Typography } from '@material-ui/core';
// @types
import CardActionArea from '@material-ui/core/CardActionArea';

import { UserData } from '../../../../@types/user';
//
import SvgIconStyle from '../../../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 9 / 16)',
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type PeerCardProps = {
  user: UserData;
  openModal: () => void;
};

export default function PeerCard({ user, openModal }: PeerCardProps) {
  const { name, cover, position, avatarUrl } = user;

  return (
    <Card onClick={openModal}>
      <CardActionArea>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 144,
              height: 62,
              zIndex: 10,
              bottom: -26,
              position: 'absolute'
            }}
          />
          <Avatar
            alt={name}
            src={avatarUrl}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              position: 'absolute',
              transform: 'translateY(-50%)'
            }}
          />
          <CoverImgStyle alt="cover" src={cover} />
        </CardMediaStyle>

        <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
          {name}
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
          {position}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
