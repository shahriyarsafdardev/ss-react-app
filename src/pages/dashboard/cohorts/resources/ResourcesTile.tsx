import React from 'react';
import { CardContent, Stack, Typography, Checkbox, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';
import { StyledImage, StyledTooltip, StyledCard, StyledBox, getColor, ParentBox } from './Common';

function ResourcesTile({ material }: { material: any }) {
  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <ParentBox>
              <StyledImage
                src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${material.type}.png`}
              />
              <StyledBox
                key={material.materialID}
                sx={{ backgroundColor: getColor(material.type) }}
              >
                <Typography
                  sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '12px', width: '100px' }}
                >
                  {material.type}
                </Typography>
              </StyledBox>
            </ParentBox>
            <Stack>
              <Typography variant="h5" style={{ marginBottom: '14px' }}>
                {material.materialName.length > 95
                  ? `${material.materialName.slice(0, 96)}...`
                  : material.materialName}
              </Typography>
              <Typography variant="subtitle2">
                {material.author.length > 130
                  ? `${material.author.slice(0, 131)}...`
                  : material.author}
              </Typography>
            </Stack>
          </Stack>
          <StyledTooltip
            title="I've read this resource"
            placement="left"
            arrow
            sx={{ backgroundColor: '#ffffff', color: '#101658' }}
          >
            <Checkbox
              checked={false}
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
