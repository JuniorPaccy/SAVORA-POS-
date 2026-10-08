// import React from 'react';import {Card,Box,Typography} from '@mui/material';
// export default function StatCard({label,value,sub,icon,color='primary',trend}){const Icon=icon;return <Card className="stat-card"><Box className="stat-icon" sx={{color:`${color}.main`,bgcolor:`${color}.main`+'14'}}><Icon/></Box><Box sx={{flex:1}}><Typography variant="body2" color="text.secondary">{label}</Typography><Typography className="stat-value">{value}</Typography>{sub&&<Typography variant="caption" color="text.secondary">{sub}</Typography>}</Box>{trend&&<Typography className="trend">{trend}</Typography>}</Card>}

import React from 'react';
import { Card, Box, Typography } from '@mui/material';

export default function StatCard({
  label,
  value,
  sub,
  icon,
  color = 'primary',
  trend,
}) {
  const Icon = icon;

  return (
    <Card className="stat-card">
      <Box
        className="stat-icon"
        sx={{
          color: `${color}.main`,
          bgcolor: `${color}.main` + '14',
        }}
      >
        <Icon />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>

        <Typography className="stat-value">
          {value}
        </Typography>

        {sub && (
          <Typography variant="caption" color="text.secondary">
            {sub}
          </Typography>
        )}
      </Box>

      {trend && (
        <Typography className="trend">
          {trend}
        </Typography>
      )}
    </Card>
  );
}