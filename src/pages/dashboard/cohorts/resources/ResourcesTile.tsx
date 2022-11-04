import React, { useState } from 'react';
import { CardContent, Stack, Typography, Checkbox } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';
import { useDispatch } from 'redux/store';
import { markReadingCompleted } from 'redux/slices/cohort';
import { SessionMaterial } from '../../../../@types/cohorts';
import { StyledImage, StyledTooltip, StyledCard, StyledBox, getColor, ParentBox } from './Common';

function ResourcesTile({ sessionID, material }: { sessionID: string; material: SessionMaterial }) {
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [checked, setChecked] = useState(material?.complete);
  const dispatch = useDispatch();

  const handleToggleRead = () => {
    dispatch(markReadingCompleted(cohortID, sessionID, material?.id, !checked));
    setChecked(!checked);
  };

  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ padding: '20px !important' }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <ParentBox>
              <StyledImage
                src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${material.material_type}.png`}
              />
              <StyledBox
                key={material.id}
                sx={{ backgroundColor: getColor(material.material_type) }}
              >
                <Typography
                  sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '12px', width: '100px' }}
                >
                  {material.material_type}
                </Typography>
              </StyledBox>
            </ParentBox>
            <Stack>
              <Typography variant="h5" style={{ fontSize: '1.1rem' }}>
                {material.name.length > 95 ? `${material.name.slice(0, 96)}...` : material.name}
              </Typography>
              <Typography variant="subtitle2">
                {material.info_text?.length > 130
                  ? `${material.info_text?.slice(0, 131)}...`
                  : material.info_text}
              </Typography>
            </Stack>
          </Stack>
          <StyledTooltip
            title={checked ? "I haven't read this resource" : "I've read this resource"}
            placement="left"
            arrow
            sx={{ backgroundColor: '#ffffff', color: '#101658' }}
            onClick={handleToggleRead}
          >
            <Checkbox
              checked={checked}
              sx={{ height: '50px', width: '50px' }}
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
              checkedIcon={<Icon icon={checkCircleFilled} color="#101658" width="40" height="40" />}
            />
          </StyledTooltip>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

export default ResourcesTile;
