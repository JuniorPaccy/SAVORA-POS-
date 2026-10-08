// import React from 'react';import {Box,Typography} from '@mui/material';import InboxRoundedIcon from '@mui/icons-material/InboxRounded';export default function EmptyState({title='Nothing here yet',text='There is no data to display.'}){return <Box className="empty-state"><InboxRoundedIcon/><Typography fontWeight={800}>{title}</Typography><Typography variant="body2" color="text.secondary">{text}</Typography></Box>}

import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';

export default function EmptyState({
  title = 'Nothing here yet',
  text = 'There is no data to display.',
}) {
  return (
    <Box className="empty-state">
      <InboxRoundedIcon />
      <Typography fontWeight={800}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}