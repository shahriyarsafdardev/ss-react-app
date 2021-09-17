// material
import { styled } from '@material-ui/core/styles';
import { Card, Avatar, Typography } from '@material-ui/core';
// @types
import { StudentProfile } from '../../@types/cohorts';
//
import SvgIconStyle from '../SvgIconStyle';

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
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd
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
  peer: StudentProfile;
  modalHandler: () => void;
};

export default function StudentProfileCard({ peer, modalHandler }: PeerCardProps) {
  const { first_name, last_name, current_company, profile_image_url, current_position } = peer;

  return (
    <Card onClick={modalHandler} style={{ cursor: 'pointer' }}>
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
          alt={first_name}
          src={current_company.logo_url}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        />
        <CoverImgStyle alt="cover" src={profile_image_url} />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {`${first_name} ${last_name}`}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {current_position}
      </Typography>
    </Card>
  );
}
