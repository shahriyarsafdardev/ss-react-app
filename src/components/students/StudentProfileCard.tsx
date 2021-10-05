// material
import { styled } from '@material-ui/core/styles';
import { Card, Avatar, Typography } from '@material-ui/core';
// @types
import { StudentProfile, Company } from '../../@types/cohorts';
//
import SvgIconStyle from '../SvgIconStyle';

// ----------------------------------------------------------------------
const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}));

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '300px',
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
type ContactProps = {
  id?: string;
  first_name: string;
  last_name: string;
  current_company: Company;
  current_position: string;
  profile_image_url: string;
};
type StudentProfileCardProps = {
  peer: StudentProfile | ContactProps;
  modalHandler: any;
};

export default function StudentProfileCard({ peer, modalHandler }: StudentProfileCardProps) {
  const { first_name, last_name, current_company, profile_image_url, current_position } = peer;

  return (
    <StyledCard
      onClick={() => modalHandler(peer)}
      style={{ cursor: 'pointer', paddingBottom: 25 }}
      id={peer.id ? `peer-grid-${peer.id}` : ''}
    >
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
            bottom: -34
          }}
        />
        <CoverImgStyle alt="cover" src={profile_image_url} />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {`${first_name} ${last_name}`}
      </Typography>

      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {current_company?.name}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {current_position}
      </Typography>
    </StyledCard>
  );
}
