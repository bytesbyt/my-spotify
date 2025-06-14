import { useInView } from 'react-intersection-observer';
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import { Track } from '../../../models/commonType';
import useAddItemToPlaylist from '../../../hooks/useAddItemToPlaylist';
import { useParams } from 'react-router';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../../utils/auth';
import { renderUnauthorizedError } from './RenderUnauthorizedError';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: '100%',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));

const AlbumImage = styled('img')({
  borderRadius: '4px',
  marginRight: '12px',
});

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const { id } = useParams<{ id: string }>();
  const { mutate: addItemToPlaylist } = useAddItemToPlaylist();
  const { data: user } = useGetCurrentUserProfile();

  const handleAddItemtoPlaylist = (uri: string) => {
    if (id && user) {
      addItemToPlaylist({ playlist_id: id, uris: [uri] });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <StyledTableContainer
      sx={{
        width: '100vw',
        position: 'relative',
      }}
    >
      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
        <TableBody sx={{ width: '100%' }}>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <AlbumImage src={track.album?.images[0].url} width="40px" />
                  </Box>
                  <Box>
                    <Typography fontWeight={700}>{track.name}</Typography>
                    <Typography color="text.secondary">
                      {track.artists ? track.artists[0].name : 'Unknown Artist'}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{track.album?.name}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    if (track.uri) {
                      handleAddItemtoPlaylist(track.uri);
                    }
                    return renderUnauthorizedError();
                  }}
                >
                  Add
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={ref} style={{ height: 1 }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </StyledTableContainer>
  );
};

export default SearchResultList;
