import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlaylists';
import { Track } from '../../../models/commonType';

interface Props {
  track: Track;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const TrackListItem = ({ track }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const { data: userProfile } = useGetCurrentUserProfile();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

  const playlists =
    data?.pages
      .flatMap((page) => page.items)
      .filter((playlist) => playlist.owner?.id === userProfile?.id) || [];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 8px',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Avatar
          src={track.album?.images?.[0]?.url}
          alt={track.name}
          variant="square"
          sx={{ width: 48, height: 48, borderRadius: 1 }}
        />
        <Box>
          <Typography fontWeight={600}>{track.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {track.artists?.map((a) => a.name).join(', ')}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
        {track.duration_ms ? formatDuration(track.duration_ms) : '-'}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: { maxHeight: 48 * 5, width: '220px', overflowY: 'auto' },
          onScroll: (e: React.UIEvent<HTMLElement>) => {
            const target = e.currentTarget;
            const bottom =
              target.scrollHeight - target.scrollTop === target.clientHeight;
            if (bottom && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          },
        }}
      >
        {isFetchingNextPage && (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              Loading playlists...
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default TrackListItem;
