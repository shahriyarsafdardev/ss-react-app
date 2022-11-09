import React, { useState, useContext } from 'react';
import { CardContent, Stack, Typography, Checkbox, Link } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';
import { useDispatch } from 'redux/store';
import { markReadingCompleted } from 'redux/slices/cohort';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { SessionMaterial } from '../../../../@types/cohorts';
import {
  StyledImage,
  StyledTooltip,
  StyledCard,
  getColor,
  ResourceIcon,
  ResourceType
} from './Common';

function ResourcesTile({
  sessionID,
  material,
  isPublic,
  sessionData
}: {
  sessionID: string;
  material: SessionMaterial;
  sessionData: any;
  isPublic: boolean;
}) {
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [checked, setChecked] = useState(material?.complete);
  const dispatch = useDispatch();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const handleToggleRead = () => {
    dispatch(markReadingCompleted(cohortID, sessionID, material?.id, !checked));
    setChecked(!checked);
  };

  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ padding: '20px !important' }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginRight: '15px', width: '100%' }}
            onClick={() => {
              sendAnalyticsData('Resources Page - Resource Opened', {
                'Session ID': material?.session_id,
                'Session Number': sessionData?.session_number,
                'Session Name': sessionData?.session_name,
                'Resource ID': material?.id,
                'Resource Number': material?.index,
                'Resource Name': material?.name,
                'Resource Author': material?.info_text,
                'Resource Link': material?.action_url
              });
              window.open(material?.action_url, '_blank');
            }}
          >
            <ResourceIcon>
              <StyledImage
                src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${material.material_type}.png`}
              />
              <ResourceType sx={{ backgroundColor: getColor(material.material_type) }}>
                <Typography
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    width: '100px',
                    textAlign: 'center',
                    wordBreak: 'break-word'
                  }}
                >
                  {material.material_type}
                </Typography>
              </ResourceType>
            </ResourceIcon>
            <Stack>
              <Typography variant="h5" sx={{ color: '#222C36', fontSize: '1.1rem' }}>
                {material.name.length > 95 ? `${material.name.slice(0, 96)}...` : material.name}
              </Typography>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={{ xs: 1, md: 2 }}
              >
                <Typography
                  sx={{
                    fontSize: '13px',
                    px: 1,
                    py: 0.2,
                    backgroundColor: '#F6F7F8',
                    borderRadius: '5px',
                    color: '#334155'
                  }}
                >
                  Session {sessionData?.session_number}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#a9a9a9' }}>
                  {material.info_text?.length > 130
                    ? `${material.info_text?.slice(0, 131)}...`
                    : material.info_text}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {!isPublic && (
            <StyledTooltip
              title={checked ? "I haven't read this resource" : "I've read this resource"}
              placement="left"
              arrow
              sx={{ backgroundColor: '#ffffff', color: '#101658' }}
              onClick={handleToggleRead}
            >
              <Checkbox
                checked={checked}
                sx={{ height: '50px', width: '50px', minHeight: '50px', minWidth: '50px' }}
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

export default ResourcesTile;
