// import React from 'react';import {Card,Box,Typography} from '@mui/material';export default function SectionCard({title,subtitle,action,children,sx}){return <Card sx={{p:2.2,...sx}}><Box display="flex" alignItems="center" justifyContent="space-between" mb={2}><Box><Typography fontWeight={800}>{title}</Typography>{subtitle&&<Typography variant="caption" color="text.secondary">{subtitle}</Typography>}</Box>{action}</Box>{children}</Card>}

import React from 'react';
import { Card, Box, Typography } from '@mui/material';

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  sx,
}) {
  return (
    <Card sx={{ p: 2.2, ...sx }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box>
          <Typography fontWeight={800}>{title}</Typography>

          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {action}
      </Box>

      {children}
    </Card>
  );
}