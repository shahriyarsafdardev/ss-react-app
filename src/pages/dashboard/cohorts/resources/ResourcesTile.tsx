import { useState, useContext, memo, useCallback } from 'react';
import { CardContent, Stack, Typography, Checkbox, useMediaQuery, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';
import { useDispatch } from 'redux/store';
import { markReadingCompleted } from 'redux/slices/cohort';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { ResourceContext } from 'contexts/ResourceContext';
import { useLocation } from 'react-router-dom';
import { debounce, memoize } from 'lodash';
import { SessionMaterial } from '../../../../@types/cohorts';
import {
  StyledImage,
  StyledTooltip,
  StyledCard,
  getColor,
  ResourceIcon,
  ResourceType,
  ResourceDetailBox,
  useStyles
} from './Common';

function ResourcesTile({
  sessionID,
  material,
  isPublic,
  sessionData,
  hostName,
  setState
}: {
  sessionID: string;
  material: SessionMaterial;
  sessionData: any;
  isPublic: boolean;
  hostName?: string;
  setState: Function;
}) {
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [checked, setChecked] = useState(material?.complete);
  const dispatch = useDispatch();
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const { showLimitModal } = useContext(ResourceContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const url = new URLSearchParams(useLocation().search);
  const source = url.get('source') || '';
  const classes = useStyles();
  const isLocalLink = material?.action_url?.includes('s3.eu-west-2.amazonaws.com');
  const isPreReading = material?.category === 'Pre-Reading';

  const handleToggleRead = debounce(() => {
    dispatch(markReadingCompleted(cohortID, sessionID, material?.id, !checked));
    setChecked(!checked);
  }, 300);

  const handleTileOnClick = useCallback(() => {
    if (localStorage.getItem('resources_opened_count') === '1' && isPublic) {
      showLimitModal(true);
      return;
    }
    sendAnalyticsData('Resources Page - Resource Opened', {
      'Session ID': material?.session_id,
      'Session Number': sessionData?.session_number,
      'Session Name': sessionData?.session_name,
      'Resource ID': material?.id,
      'Resource Number': material?.index,
      'Resource Name': material?.name,
      'Resource Author': material?.info_text,
      'Resource Link': material?.action_url,
      Source: source
    });

    if (isLocalLink && isPreReading && isPublic) {
      enqueueSnackbar(`You need to enroll in ${hostName}’s course to access this material`, {
        variant: 'warning'
      });
    } else {
      window.open(material?.action_url, '_blank');
      isPublic && localStorage.setItem('resources_opened_count', '1');
    }
  }, [isPublic, isLocalLink, isPreReading, material, sessionData, hostName]);

  const clipTitle = memoize((mobileView: boolean, title: String) => {
    if (!mobileView && title.length > 95) {
      return `${title.slice(0, 96)}...`;
    }
    if (mobileView && title.length > 60) {
      return `${title.slice(0, 61)}...`;
    }
    return title;
  });

  const resourceIcon = () => (
    <ResourceIcon>
      <StyledImage
        src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${material.material_type}.png`}
      />
      <ResourceType sx={{ backgroundColor: getColor(material.material_type) }}>
        <Typography className={classes.resourceText}>{material.material_type}</Typography>
      </ResourceType>
    </ResourceIcon>
  );

  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ padding: '20px !important' }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginRight: '15px', width: '100%' }}
            onClick={handleTileOnClick}
          >
            {!isMobile && resourceIcon()}
            <Stack>
              <Typography
                variant="h5"
                className={classes.resourceTitle}
                onClick={() => handleTileOnClick()}
              >
                {clipTitle(isMobile, material.name)}
              </Typography>
              <Stack
                direction="row"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={{ xs: 1, md: 2 }}
              >
                {isMobile && resourceIcon()}
                <ResourceDetailBox>
                  <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
                    <Typography
                      className={classes.styledTypography}
                      onClick={() => setState(sessionData?.session_number, 'number')}
                    >
                      Session {sessionData?.session_number}
                    </Typography>
                    <Typography
                      className={classes.styledTypography}
                      onClick={() => setState(material?.category, 'string')}
                    >
                      {material?.category}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#a9a9a9', marginLeft: { xs: 0, md: '15px' } }}
                  >
                    {material.info_text?.length > 130
                      ? `${material.info_text?.slice(0, 131)}...`
                      : material.info_text}
                  </Typography>
                </ResourceDetailBox>
              </Stack>
            </Stack>
          </Stack>
          {!isPublic && !isMobile && (
            <StyledTooltip
              title={checked ? "I haven't read this resource" : "I've read this resource"}
              placement="left"
              arrow
              sx={{ backgroundColor: '#ffffff', color: '#101658' }}
              onClick={handleToggleRead}
            >
              <Checkbox
                checked={checked}
                className={classes.checkbox}
                icon={
                  <Icon
                    icon={checkCircleFilled}
                    color="#E0E0E0"
                    width="100%"
                    height="100%"
                    style={{
                      '&:hover': {
                        color: '#828282'
                      }
                    }}
                  />
                }
                checkedIcon={
                  <Icon icon={checkCircleFilled} color="#101658" width="40" height="40" />
                }
              />
            </StyledTooltip>
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

export default memo(ResourcesTile);
