import React from 'react';
import { Card, CardContent, Stack, Typography, Checkbox } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';
import { StyledImage } from './Common';

function ResourcesTile({ material }: { material: any }) {
  return (
    <Card variant="outlined" style={{ borderRadius: '8px !important' }}>
      <CardContent style={{ height: '250px' }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <StyledImage
              src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${material.type}.png`}
            />
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
          </Stack>
          <Typography variant="h5" style={{ height: '50px' }}>
            {material.materialName.length > 55
              ? `${material.materialName.slice(0, 56)}...`
              : material.materialName}
          </Typography>
          <Typography variant="subtitle2">
            {material.author.length > 45 ? `${material.author.slice(0, 46)}...` : material.author}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ResourcesTile;
